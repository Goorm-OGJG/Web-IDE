package com.ogjg.back.file.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.config.security.jwt.JwtUserDetails;
import com.ogjg.back.file.dto.request.CreateFileRequest;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import com.ogjg.back.file.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    /**
     * 파일 생성
     */
    @PostMapping("")
    public ApiResponse<Void> createFile(
            @RequestParam("filePath") String filePath,
            @RequestBody CreateFileRequest request,
            @AuthenticationPrincipal JwtUserDetails user
    ) {
        fileService.createFile(user.getEmail(), filePath, request.getUuid());
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 파일 삭제
     */
    @DeleteMapping("")
    public ApiResponse<Void> deleteFile(
        @RequestParam("filePath") String filePath,
            @AuthenticationPrincipal JwtUserDetails user
    ) {
        fileService.deleteFile(user.getEmail(), filePath);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 파일 수정
     */
    @PutMapping("")
    public ApiResponse<Void> updateFile(
            @RequestParam("filePath") String filePath,
            @RequestBody UpdateFileRequest request,
            @AuthenticationPrincipal JwtUserDetails user
    ) {
        fileService.updateFile(user.getEmail(), filePath, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 파일 이름 수정
     */
    @PutMapping("/rename")
    public ApiResponse<Void> updateFilename(
            @RequestParam String filePath,
            @RequestParam String newFilename,
            @AuthenticationPrincipal JwtUserDetails user

    ) {
        fileService.updateFilename(user.getEmail(), filePath, newFilename);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }
}
