package com.ogjg.back.directory.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.directory.dto.request.CreateDirectoryRequest;
import com.ogjg.back.directory.service.DirectoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam("directoryPath") String directoryPath,
            @RequestBody CreateDirectoryRequest request
    ) {
        String loginEmail = "ogjg1234@naver.com";
        directoryService.createDirectory(loginEmail, directoryPath, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 디렉토리 삭제
     */
    @DeleteMapping("")
    public ApiResponse<Void> deleteDirectory(
            @RequestParam String directoryPath
    ) {
        String loginEmail = "ogjg1234@naver.com";
        directoryService.deleteDirectory(loginEmail, directoryPath);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 디렉토리 이름 수정
     */
    @PutMapping("/rename")
    public ApiResponse<Void> updateFilename(
            @RequestParam String directoryPath,
            @RequestParam String newDirectoryName
    ) {
        String loginEmail = "ogjg1234@naver.com";
        directoryService.updateDirectoryName(loginEmail, directoryPath, newDirectoryName);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }
}
