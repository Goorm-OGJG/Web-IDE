package com.ogjg.back.user.service;

import com.ogjg.back.s3.service.S3ProfileImageService;
import com.ogjg.back.user.domain.EmailAuth;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.dto.request.InfoUpdateRequest;
import com.ogjg.back.user.dto.request.PasswordUpdateRequest;
import com.ogjg.back.user.dto.request.UserRequest;
import com.ogjg.back.user.dto.response.ImgUpdateResponse;
import com.ogjg.back.user.exception.SignUpFailure;
import com.ogjg.back.user.exception.NotFoundUser;
import com.ogjg.back.user.repository.EmailAuthRepository;
import com.ogjg.back.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
        findUser.updatePassword(findUser.getPassword(), request);
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
    public void signUp(UserRequest userRequest) {

        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new SignUpFailure("이미 회원가입된 이메일 입니다");
        }

        EmailAuth emailAuth = findEmailAuthByEmail(userRequest.getEmail());

        if (!emailAuth.isStatus() || emailAuth.getAuthenticatedAt() == null){
            throw new SignUpFailure("이메일 인증을 진행해 주세요");
        }

        long minutes = Duration.between(emailAuth.getAuthenticatedAt(), LocalDateTime.now()).toMinutes();
        if (minutes > 30){
            throw new SignUpFailure("이메일 인증을 다시 진행해 주세요");
        }

        userRepository.save(new User(userRequest));
    }

    private EmailAuth findEmailAuthByEmail(String email) {
        return emailAuthRepository.findByEmail(email)
                .orElseThrow(() -> new SignUpFailure("이메일 인증을 진행해 주세요"));
    }

}
