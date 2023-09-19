package com.ogjg.back.user.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.user.dto.request.InfoUpdateRequest;
import com.ogjg.back.user.dto.request.PasswordUpdateRequest;
import com.ogjg.back.user.dto.response.ImgUpdateResponse;
import com.ogjg.back.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    // todo : update 로직 응답 값 정의 및 추가 필요, 토큰 추가 시 email 정보 추가
    /**
     * 프로필 사진 업로드(변경 시 덮어씀)
     */
    @PatchMapping("/img")
    public ApiResponse<ImgUpdateResponse> updateImg(@RequestParam("img") MultipartFile imgFile) {
        String loginEmail = "ogjg1234@naver.com";

        return new ApiResponse<>(
                ErrorCode.SUCCESS,
                userService.updateImg(imgFile, loginEmail)
        );
    }

    /**
     * 회원 정보 변경
     */
    @PatchMapping("/info")
    public ApiResponse<Void> updateInfo(@RequestBody InfoUpdateRequest request) {
        String loginEmail = "ogjg1234@naver.com";

        userService.updateInfo(request, loginEmail);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 회원 비밀번호 변경
     */
    @PatchMapping("/password")
    public ApiResponse<Void> updatePassword(@RequestBody PasswordUpdateRequest request) {
        String loginEmail = "ogjg1234@naver.com";

        userService.updatePassword(request, loginEmail);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 회원 탈퇴
     */
    @PatchMapping("/deactivate")
    public ApiResponse<Void> deactivate() {
        String loginEmail = "ogjg1234@naver.com";

        userService.deactivate(loginEmail);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }
}
