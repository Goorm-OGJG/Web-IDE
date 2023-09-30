package com.ogjg.back.file.service;

import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.file.dto.request.CreateFileRequest;
import com.ogjg.back.file.dto.request.DeleteFileRequest;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import com.ogjg.back.file.dto.request.UpdateFilenameRequest;
import com.ogjg.back.s3.service.S3FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.S3PathUtil.createNewFilePath;
import static com.ogjg.back.common.util.S3PathUtil.extractContainerName;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {
    private final ContainerRepository containerRepository;
    private final S3FileService s3FileService;

    // todo : 모든 로직에 해당 파일이 존재하는지 여부 확인 필요하다.

    @Transactional
    public void createFile(String loginEmail, CreateFileRequest request) {
        String filePath = request.getFilePath();
        if (!isContainerExist(loginEmail, extractContainerName(filePath))) throw new NotFoundContainer();

        s3FileService.createFile(loginEmail, filePath);
    }

    @Transactional
    public void deleteFile(String loginEmail, DeleteFileRequest request) {
        String filePath = request.getFilePath();
        if (!isContainerExist(loginEmail, extractContainerName(filePath))) throw new NotFoundContainer();

        s3FileService.deleteFile(loginEmail, filePath);
    }

    @Transactional
    public void updateFile(String loginEmail, UpdateFileRequest request) {
        String filePath = request.getFilePath();
        if (!isContainerExist(loginEmail, extractContainerName(filePath))) throw new NotFoundContainer();

        s3FileService.updateFile(loginEmail, filePath, request.getContent());
    }

    @Transactional
    public void updateFilename(String loginEmail, UpdateFilenameRequest request) {
        String filePath = request.getFilePath();
        String newFilename = request.getNewFilename();

        String newFilePath = createNewFilePath(filePath, newFilename);
        log.info("newPath={}", newFilePath);
        if (!isContainerExist(loginEmail, extractContainerName(filePath))) throw new NotFoundContainer();

        s3FileService.updateFilename(loginEmail, filePath, newFilePath);
    }

    private boolean isContainerExist(String loginEmail, String containerName) {
        return containerRepository.findByNameAndEmail(containerName, loginEmail)
                .isPresent();
    }
}
