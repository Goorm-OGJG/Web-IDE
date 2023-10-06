package com.ogjg.back.file.controller;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.file.dto.request.CreateFileRequest;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import com.ogjg.back.file.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/containers/{containerId}/files")
public class FileController {

    private final FileService fileService;

    /**
     * 파일 생성
     */
    @PostMapping("")
    public ApiResponse<Void> createFile(
            @PathVariable("containerId") Long containerId,
            @RequestParam("filePath") String filePath,
            @RequestBody CreateFileRequest request
    ) {
        fileService.createFile(containerId, filePath, request.getUuid());
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 파일 삭제
     */
    @DeleteMapping("")
    public ApiResponse<Void> deleteFile(
            @PathVariable("containerId") Long containerId,
            @RequestParam("filePath") String filePath
    ) {

        fileService.deleteFile(containerId, filePath);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 파일 수정
     */
    @PutMapping("")
    public ApiResponse<Void> updateFile(
            @PathVariable("containerId") Long containerId,
            @RequestParam("filePath") String filePath,
            @RequestBody UpdateFileRequest request
    ) {
        fileService.updateFile(containerId, filePath, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 파일 이름 수정
     */
    @PutMapping("/rename")
    public ApiResponse<Void> updateFilename(
            @PathVariable("containerId") Long containerId,
            @RequestParam String filePath,
            @RequestParam String newFilename
    ) {
        fileService.updateFilename(containerId, filePath, newFilename);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }
}
