package com.ogjg.back.container.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import com.ogjg.back.container.dto.response.ContainerNameCheckResponse;
import com.ogjg.back.container.service.ContainerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/containers")
@RequiredArgsConstructor
public class ContainerController {

    private final ContainerService containerService;

    /**
     * 컨테이너 생성
     */
    @PostMapping("")
    public ApiResponse<Void> create(@RequestBody ContainerCreateRequest request) {
        String loginEmail = "ogjg1234@naver.com";

        containerService.createContainer(loginEmail, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 컨테이너 이름 중복체크
     */
    @GetMapping("/check")
    public ApiResponse<ContainerNameCheckResponse> checkDuplication(
            @RequestParam("name") String containerName
    ) {
        String loginEmail = "ogjg1234@naver.com";

        return new ApiResponse<>(
                ErrorCode.SUCCESS,
                containerService.checkDuplication(containerName, loginEmail)
        );
    }
}
