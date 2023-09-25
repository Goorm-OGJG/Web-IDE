package com.ogjg.back.user.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.user.dto.request.EmailAuthRequest;
import com.ogjg.back.user.dto.request.InfoUpdateRequest;
import com.ogjg.back.user.dto.request.PasswordUpdateRequest;
import com.ogjg.back.user.dto.request.UserRequest;
import com.ogjg.back.user.dto.response.ImgUpdateResponse;
import com.ogjg.back.user.service.EmailAuthService;
import com.ogjg.back.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final EmailAuthService emailAuthService;
    private final UserService userService;
    private final Map<String, SseEmitter> clients;
    public static final long EMAIL_TIMEOUT = 3 * 60 * 1000L;

    /*
     * 회원가입
     * */
    @PostMapping("/signup")
    public ApiResponse<?> signup(
            @RequestBody @Valid UserRequest userRequest
    ) {
        userService.signUp(userRequest);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    // todo : update 로직 응답 값 정의 및 추가 필요, 토큰 추가 시 email 정보 추가
    /**
     * 프로필 사진 업로드(변경 시 덮어씀)
     */
    @PatchMapping("/img")
    public ApiResponse<ImgUpdateResponse> updateImg(
            @RequestParam("img") MultipartFile imgFile
    ) {
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
    public ApiResponse<Void> updateInfo(
            @Valid @RequestBody InfoUpdateRequest request
    ) {
        String loginEmail = "ogjg1234@naver.com";

        userService.updateInfo(request, loginEmail);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 회원 비밀번호 변경
     */
    @PatchMapping("/password")
    public ApiResponse<Void> updatePassword(
            @RequestBody PasswordUpdateRequest request
    ) {
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

    /*
     * emitter 연결유지
     * 이메일 인증메일 보내기
     * */
    @PostMapping("/email-auth/{clientId}")
    public SseEmitter emailAuth(
            @PathVariable(name = "clientId") String clientId,
            @RequestBody @Valid EmailAuthRequest emailAuthRequest
    ) {
        SseEmitter emitter = new SseEmitter(EMAIL_TIMEOUT);

        emitter.onTimeout(() -> {
            emailAuthService.completeEmitter(emitter);
            emailAuthService.removeClient(clientId);
        });

        clients.put(clientId, emitter);
        emailAuthService.emailAuth(emailAuthRequest, clientId);

        ApiResponse<?> apiResponse = new ApiResponse<>(
                ErrorCode.SUCCESS
                        .changeMessage("인증 메일이 전송되었습니다, 인증 확인 버튼을 눌러주세요")
        );

        try {
            emitter.send(SseEmitter.event().data(apiResponse));
        } catch (IOException e) {
            log.error("인증 메일 메시지 전송에 실패했습니다");
        }

        return emitter;
    }
}
