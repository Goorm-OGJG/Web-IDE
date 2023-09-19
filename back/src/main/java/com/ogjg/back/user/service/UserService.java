package com.ogjg.back.user.service;

import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.dto.request.InfoUpdateRequest;
import com.ogjg.back.user.dto.request.PasswordUpdateRequest;
import com.ogjg.back.user.dto.response.ImgUpdateResponse;
import com.ogjg.back.user.exception.NotFoundUser;
import com.ogjg.back.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public ImgUpdateResponse updateImg(MultipartFile imgFile, String loginEmail) {
        User findUser = findByEmail(loginEmail);

        // todo : 이미지 데이터 aws 업로드 로직 추가
        // S3에 파일 데이터 저장 후, 경로 반환
        String aws_url = "temp_url : {bucket-name}.s3.{region-code}.amazonaws.com/" +findUser.getEmail()+"/{fileName}";

        User user = findUser.updateImg(aws_url);
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
        findUser.updatePassword(request.getPassword());
    }

    @Transactional
    public void deactivate(String loginEmail) {
        User findUser = findByEmail(loginEmail);
        findUser.deactivate();
    }

    @Transactional(readOnly = true)
    protected User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundUser());
    }
}
