package com.ogjg.back.file.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.file.dto.request.CreateFileRequest;
import com.ogjg.back.file.dto.request.DeleteFileRequest;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import com.ogjg.back.file.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    @PostMapping("")
    public ApiResponse<Void> createFile(
            @RequestBody CreateFileRequest request
    ) {
        String loginEmail = "ogjg1234@naver.com";
        fileService.createFile(loginEmail, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    @DeleteMapping("")
    public ApiResponse<Void> deleteFile(
            @RequestBody DeleteFileRequest request
    ) {
        String loginEmail = "ogjg1234@naver.com";
        fileService.deleteFile(loginEmail, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    @PutMapping("")
    public ApiResponse<Void> updateFile(
            @RequestBody UpdateFileRequest request
    ) {
        String loginEmail = "ogjg1234@naver.com";
        fileService.updateFile(loginEmail, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }
}
