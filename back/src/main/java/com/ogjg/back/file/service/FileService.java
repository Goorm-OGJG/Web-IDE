package com.ogjg.back.file.service;

import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.file.dto.request.CreateFileRequest;
import com.ogjg.back.file.dto.request.DeleteFileRequest;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import com.ogjg.back.s3.service.S3FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.S3PathUtil.extractContainerName;

@Service
@RequiredArgsConstructor
public class FileService {
    private final ContainerRepository containerRepository;
    private final S3FileService s3FileService;

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

    private boolean isContainerExist(String loginEmail, String containerName) {
        return containerRepository.findByNameAndEmail(containerName, loginEmail)
                .isPresent();
    }
}
