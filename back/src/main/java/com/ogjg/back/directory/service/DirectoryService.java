package com.ogjg.back.directory.service;

import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.directory.dto.request.CreateDirectoryRequest;
import com.ogjg.back.directory.dto.request.DeleteDirectoryRequest;
import com.ogjg.back.directory.dto.request.UpdateDirectoryNameRequest;
import com.ogjg.back.directory.exception.DirectoryAlreadyExists;
import com.ogjg.back.directory.exception.NotFoundDirectory;
import com.ogjg.back.s3.service.S3DirectoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.S3PathUtil.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class DirectoryService {

    private final ContainerRepository containerRepository;
    private final S3DirectoryService s3DirectoryService;

    @Transactional
    public void createDirectory(String loginEmail, CreateDirectoryRequest request) {
        String directoryPath = request.getDirectoryPath();
        String s3Path = givenPathToS3Path(loginEmail, directoryPath);

        if (!isContainerExist(loginEmail, extractContainerName(directoryPath))) throw new NotFoundContainer();
        if (s3DirectoryService.isDirectoryAlreadyExist(s3Path)) throw new DirectoryAlreadyExists();

        s3DirectoryService.createDirectory(loginEmail, directoryPath);
    }

    @Transactional
    public void deleteDirectory(String loginEmail, DeleteDirectoryRequest request) {
        String directoryPath = request.getDirectoryPath();
        String s3Path = givenPathToS3Path(loginEmail, directoryPath);

        if (!isContainerExist(loginEmail, extractContainerName(directoryPath))) throw new NotFoundContainer();
        if (!s3DirectoryService.isDirectoryAlreadyExist(s3Path)) throw new NotFoundDirectory();

        s3DirectoryService.deleteDirectory(loginEmail, directoryPath);
    }

    @Transactional
    public void updateDirectoryName(String loginEmail, UpdateDirectoryNameRequest request) {
        String originPath = request.getDirectoryPath();
        String name = request.getNewDirectoryName();

        String originS3Path = givenPathToS3Path(loginEmail, originPath);
        String newS3Path = createNewDirectoryPath(originS3Path, name);

        if (!isContainerExist(loginEmail, extractContainerName(originPath))) throw new NotFoundContainer();
        if (!s3DirectoryService.isDirectoryAlreadyExist(originS3Path)) throw new NotFoundDirectory();

        s3DirectoryService.updateDirectoryName(originS3Path, newS3Path);
    }

    private boolean isContainerExist(String loginEmail, String containerName) {
        return containerRepository.findByNameAndEmail(containerName, loginEmail)
                .isPresent();
    }
}
