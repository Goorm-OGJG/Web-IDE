package com.ogjg.back.user.service;

import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.s3.service.S3ProfileImageService;
import com.ogjg.back.user.domain.EmailAuth;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.dto.SignUpSaveDto;
import com.ogjg.back.user.dto.request.*;
import com.ogjg.back.user.dto.response.ImgUpdateResponse;
import com.ogjg.back.user.exception.InvalidCurrentPassword;
import com.ogjg.back.user.exception.LoginFailure;
import com.ogjg.back.user.exception.NotFoundUser;
import com.ogjg.back.user.exception.SignUpFailure;
import com.ogjg.back.user.repository.EmailAuthRepository;
import com.ogjg.back.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final S3ProfileImageService s3ProfileImageService;
    private final EmailAuthRepository emailAuthRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Transactional
    public ImgUpdateResponse updateImg(MultipartFile multipartFile, String loginEmail) {
        User findUser = findByEmail(loginEmail);

        String url = s3ProfileImageService.saveImage(multipartFile, loginEmail);

        User user = findUser.updateImg(url);
        return ImgUpdateResponse.of(user);
    }

    @Transactional
    public void updateInfo(InfoUpdateRequest request, String loginEmail) {
        User findUser = findByEmail(loginEmail);
        findUser.updateInfo(request.getName());
    }

    @Transactional
    public void updatePassword(PasswordUpdateRequest request, String loginEmail) {
        User findUser = findByEmail(loginEmail);

        if (!passwordEncoder.matches(request.getCurrentPassword(), findUser.getPassword())) {
            throw new InvalidCurrentPassword();
        }

        String newPassword = passwordEncoder.encode(request.getNewPassword());
        findUser.updatePassword(newPassword);
    }

    @Transactional
    public void deactivate(String loginEmail) {
        User findUser = findByEmail(loginEmail);
        findUser.deactivate();
    }

    protected User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(NotFoundUser::new);
    }

    /*
     * 회원가입
     * */
    @Transactional
    public void signUp(SignUpRequest signUpRequest) {

        EmailAuth emailAuth = emailAuthValid(signUpRequest);

        String encryptionPassword = passwordEncoder.encode(signUpRequest.getPassword());

        userRepository.save(new User(
                new SignUpSaveDto(signUpRequest, emailAuth, encryptionPassword)
        ));
    }


    /*
     * 회원가입시 로그인 중복 , 이메일 인증 확인
     * */
    private EmailAuth emailAuthValid(SignUpRequest signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new SignUpFailure("이미 회원가입된 이메일 입니다");
        }

        EmailAuth emailAuth = findEmailAuthByEmail(signUpRequest.getEmail());

        if (!emailAuth.isStatus() || emailAuth.getAuthenticatedAt() == null) {
            throw new SignUpFailure("이메일 인증을 진행해 주세요");
        }

        long minutes = Duration.between(emailAuth.getAuthenticatedAt(), LocalDateTime.now()).toMinutes();
        if (minutes > 30) {
            throw new SignUpFailure("이메일 인증시간이 초과했습니다 다시 진행해 주세요");
        }
        return emailAuth;
    }

    private EmailAuth findEmailAuthByEmail(String email) {
        return emailAuthRepository.findByEmail(email)
                .orElseThrow(() -> new SignUpFailure("이메일 인증을 진행해 주세요"));
    }

    /*
     * 로그인
     * */
    public void login(LoginRequest loginRequest, HttpServletResponse response) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(LoginFailure::new);

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new LoginFailure();
        }

        JwtUserClaimsDto jwtUserClaimsDto = new JwtUserClaimsDto(user.getEmail());

        String accessToken = jwtUtils.generateAccessToken(jwtUserClaimsDto);
        String refreshToken = jwtUtils.generateRefreshToken(jwtUserClaimsDto);

        response.addHeader("Authorization", "Bearer " + accessToken);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setDomain("ogjg.site");
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }

}
