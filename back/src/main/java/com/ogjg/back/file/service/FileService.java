package com.ogjg.back.file.service;

import com.ogjg.back.common.util.S3PathUtil;
import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.file.domain.Path;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import com.ogjg.back.file.exception.FileAlreadyExists;
import com.ogjg.back.file.exception.NotFoundFile;
import com.ogjg.back.file.repository.PathRepository;
import com.ogjg.back.s3.service.S3FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.S3PathUtil.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {
    private final ContainerRepository containerRepository;
    private final PathRepository pathRepository;
    private final S3FileService s3FileService;

    @Transactional
    public void createFile(Long containerId, String filePath, String uuid) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();
        String s3Path = givenPathToS3Path(email, filePath);

        if (s3FileService.isFileAlreadyExist(s3Path)) throw new FileAlreadyExists();

        pathRepository.save(Path.builder()
                .container(findContainer)
                .path(extractFilePrefix(filePath))
                .name(extractFilename(filePath))
                .uuid(uuid)
                .build());

        s3FileService.createFile(s3Path);
    }

    @Transactional
    public void deleteFile(Long containerId, String filePath) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();
        String s3Path = givenPathToS3Path(email, filePath);

        if (!s3FileService.isFileAlreadyExist(s3Path)) throw new NotFoundFile();

        // db 삭제
        Path findPath = findContainer.findPath(
                extractFilePrefix(filePath),
                S3PathUtil.extractFilename(filePath)
        );
        pathRepository.delete(findPath);

        // s3 삭제
        s3FileService.deleteFile(s3Path);
    }

    @Transactional
    public void updateFile(Long containerId, String filePath, UpdateFileRequest request) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();
        String s3Path = givenPathToS3Path(email, filePath);

        if (!isContainerExist(email, extractContainerName(filePath))) throw new NotFoundContainer();
        if (!s3FileService.isFileAlreadyExist(s3Path)) throw new NotFoundFile();

        s3FileService.updateFile(s3Path, request.getContent());
    }

    @Transactional
    public void updateFilename(Long containerId, String filePath, String newFilename) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();
        String s3Path = givenPathToS3Path(email, filePath);
        String newFilePath = createNewFilePath(filePath, newFilename);

//        if (!isContainerExist(loginEmail, containerName)) throw new NotFoundContainer();
        if (!s3FileService.isFileAlreadyExist(s3Path)) throw new NotFoundFile();

        // db rename
        Path findPath = findContainer.findPath(
                extractFilePrefix(filePath),
                extractFilename(filePath)
        );
        findPath.rename(newFilename);

        // s3 rename
        s3FileService.updateFilename(email, filePath, newFilePath);
    }

    private boolean isContainerExist(String loginEmail, String containerName) {
        return containerRepository.findByNameAndEmail(containerName, loginEmail)
                .isPresent();
    }

    private Container findContainerByNameAndEmail(String containerName, String loginEmail) {
        Container container = containerRepository.findByNameAndEmail(containerName, loginEmail)
                .orElseThrow(NotFoundContainer::new);
        return container;
    }

    private Container findContainerById(Long containerId) {
        return containerRepository.findById(containerId)
                .orElseThrow(NotFoundContainer::new);
    }
}
