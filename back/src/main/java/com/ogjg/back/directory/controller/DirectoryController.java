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
@RequestMapping("/api/containers/{containerId}/directories")
public class DirectoryController {

    private final DirectoryService directoryService;

    /**
     * 디렉토리 생성
     */
    @PostMapping("")
    public ApiResponse<Void> creatDirectory(
            @PathVariable("containerId") Long containerId,
            @RequestParam("directoryPath") String directoryPath,
            @RequestBody CreateDirectoryRequest request
    ) {
        directoryService.createDirectory(containerId, directoryPath, request);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 디렉토리 삭제
     */
    @DeleteMapping("")
    public ApiResponse<Void> deleteDirectory(
            @PathVariable("containerId") Long containerId,
            @RequestParam("directoryPath") String directoryPath
    ) {
        directoryService.deleteDirectory(containerId, directoryPath);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }

    /**
     * 디렉토리 이름 수정
     */
    @PutMapping("/rename")
    public ApiResponse<Void> updateFilename(
            @PathVariable("containerId") Long containerId,
            @RequestParam("directoryPath") String directoryPath,
            @RequestParam("newDirectoryName") String newDirectoryName
    ) {
        directoryService.updateDirectoryName(containerId, directoryPath, newDirectoryName);
        return new ApiResponse<>(ErrorCode.SUCCESS);
    }
}
