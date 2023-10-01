package com.ogjg.back.directory.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.directory.dto.request.CreateDirectoryRequest;
import com.ogjg.back.directory.service.DirectoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/directories")
public class DirectoryController {

    private final DirectoryService directoryService;

    /**
     * 디렉토리 생성
     */
    @PostMapping("")
    public ApiResponse<Void> creatDirectory(
            @RequestBody CreateDirectoryRequest request
    ) {
        String loginEmail = "ogjg1234@naver.com";
        directoryService.createDirectory(loginEmail, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }
}
