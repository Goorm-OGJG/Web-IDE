package com.ogjg.back.user.service;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.config.security.emailauth.EmailAuthUserDetails;
import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.user.domain.*;
import com.ogjg.back.user.dto.EmailAuthSaveDto;
import com.ogjg.back.user.dto.request.JwtEmailAuthClaimsDto;
import com.ogjg.back.user.exception.EmailAuthFailure;
import com.ogjg.back.user.exception.SignUpFailure;
import com.ogjg.back.user.repository.EmailAuthRepository;
import com.ogjg.back.user.repository.EmailHistoryRepository;
import com.ogjg.back.user.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailAuthService {

    private final EmailAuthRepository emailAuthRepository;
    private final EmailHistoryRepository emailHistoryRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final JwtUtils jwtUtils;
    private final Map<String, SseEmitter> clients;

    private static final String EMAIL_AUTH_ADDRESS = "https://ogjg.store/api/users/email-auth/success";

    /*
     * 이메일 중복 체크 후 인증관련 데이터 저장 후 인증 메일 발송
     * */
    public void emailAuth(String email, String clientId) {

        if (userRepository.findByEmail(email).isPresent() && userRepository.findByEmail(email).get().getUserStatus() == UserStatus.ACTIVE)
            throw new SignUpFailure("이미 가입된 이메일 입니다.");

        EmailAuth emailAuth = saveEmailAuth(email, clientId);

        sendEmailAuth(email, emailAuth.getEmailToken());
    }

    /*
     * 이메일 인증 데이터 저장후 반환
     * 이미 인증기록이 존재하면 삭제후 다시 생성
     * 삭제가 아니라 업데이트를 사용한다면 성능개선 가능
     * */
    @Transactional
    private EmailAuth saveEmailAuth(String email, String clientId) {

        if (emailAuthRepository.findByEmail(email).isPresent())
            emailAuthRepository.delete(findEmailAuthByEmail(email));

        EmailAuthSaveDto emailAuthSaveDto = new EmailAuthSaveDto(email, clientId);
        emailAuthRepository.save(new EmailAuth(emailAuthSaveDto));

        EmailAuth emailAuth = findEmailAuthByEmail(email);

        String emailAuthToken = createEmailAuthToken(emailAuth);
        emailAuth.inPutEmailToken(emailAuthToken);

        return emailAuth;
    }

    /*
     * 회원가입 이메일로 EmailAuth 데이터 찾기
     * */
    private EmailAuth findEmailAuthByEmail(String email) {
        return emailAuthRepository.findByEmail(email)
                .orElseThrow(() -> new EmailAuthFailure("인증을 위한 이메일을 찾을 수 없습니다"));
    }

    /*
     * 회원가입 이메일 인증 토큰 생성
     * */
    private String createEmailAuthToken(EmailAuth emailAuth) {
        JwtEmailAuthClaimsDto emailAuthClaim = JwtEmailAuthClaimsDto.builder()
                .email(emailAuth.getEmail())
                .build();

        return jwtUtils.generateEmailAuthToken(emailAuthClaim);
    }


    /*
     * 회원가입 이메일 인증메일 발송
     * */
    private void sendEmailAuth(String email, String emailAuthToken) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String htmlContent = emailAuthTemplate("email_template.html");
            htmlContent = htmlContent.replace("project_url_address_here", EMAIL_AUTH_ADDRESS);
            htmlContent = htmlContent.replace("unique_token_here", emailAuthToken);

            helper.setTo(email);
            helper.setSubject("이메일 인증");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);

            emailHistory(email, EmailStatus.SUCCESS, EmailMessage.EMAIL_AUTH);
        } catch (MessagingException e) {
            emailHistory(email, EmailStatus.FAIL, EmailMessage.EMAIL_AUTH);
            throw new EmailAuthFailure("인증 이메일을 발송하는데 오류가 발생했습니다");

        }
    }

    public void emailHistory(String email, EmailStatus emailStatus, EmailMessage emailMessage) {
        emailHistoryRepository.save(
                new EmailHistory(email, emailStatus, emailMessage)
        );
    }

    /*
     * 회원가입 이메일 인증 UI 읽어오기
     * */
    public String emailAuthTemplate(String emailTemplate) {
        try {
            ClassPathResource resource = new ClassPathResource(emailTemplate);
            InputStream inputStream = resource.getInputStream();
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();

            int nRead;
            byte[] data = new byte[1024];
            while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }

            buffer.flush();

            return buffer.toString(StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new EmailAuthFailure("이메일 인증 템플릿을 불러올 수 없습니다");
        }
    }

    /*
     * emitter 연결 끊기
     * */
    public void completeEmitter(SseEmitter emitter) {
        try {
            emitter.complete();
        } catch (Exception e) {
            log.error("emitter를 닫는데 실패했습니다" + e.getMessage(), e);
        }
    }

    /*
     * emitter 연결 정보 제거
     * */
    public void removeClient(String clientId) {
        try {
            clients.remove(clientId);
        } catch (Exception e) {
            log.error("clients를 제거하는데 실패했습니다" + e.getMessage(), e);
        }
    }

    /*
     * 이메일 인증이 완료되면
     * 토큰에서 들어온 Email 기준으로 DB 조회 후
     * 인증상태, 인증시간 을 저장
     * */
    @Transactional
    public void successEmailAuth(EmailAuthUserDetails principal) {
        EmailAuth emailAuth = findEmailAuthByEmail(principal.getEmail());
        emailAuth.completeEmailAuth();
        emailAuth.completeEmailAuthTime();

        SseEmitter emitter = clients.get(emailAuth.getClient_id());

        successEmailResponse(emailAuth, emitter);
    }

    /*
     * 이메일 인증 성공 메시지
     * 클라이언트에 반환 후 Emitter 연결 종료
     * */
    private void successEmailResponse(EmailAuth emailAuth, SseEmitter emitter) {
        if (emitter != null) {
            try {
                emitter.send(
                        new ApiResponse<>(ErrorCode.SUCCESS.changeMessage("email-completed"))
                );
            } catch (IOException e) {
                log.error("인증완료 메시지를 보내는데 실패했습니다" + e.getMessage());
            } finally {
                completeEmitter(emitter);
                removeClient(emailAuth.getClient_id());
            }
        }
    }
}