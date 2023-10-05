package com.ogjg.back.file.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.file.domain.File;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import com.ogjg.back.file.exception.FileAlreadyExists;
import com.ogjg.back.file.exception.NotFoundFile;
import com.ogjg.back.file.repository.FileRepository;
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
    private final FileRepository fileRepository;
    private final S3FileService s3FileService;

    @Transactional
    public void createFile(String loginEmail, String filePath, String uuid) {
        String s3Path = givenPathToS3Path(loginEmail, filePath);

        String containerName = extractContainerName(filePath);
        if (!isContainerExist(loginEmail, containerName)) throw new NotFoundContainer();
        if (s3FileService.isFileAlreadyExist(s3Path)) throw new FileAlreadyExists();

        Container container = findContainerByNameAndEmail(containerName, loginEmail);

        fileRepository.save(File.builder()
                .container(container)
                .path(extractFilePrefix(filePath))
                .name(extractFileName(filePath))
                .uuid(uuid)
                .build());

        s3FileService.createFile(loginEmail, filePath);
    }

    @Transactional
    public void deleteFile(String loginEmail, String filePath) {
        String s3Path = givenPathToS3Path(loginEmail, filePath);
        String containerName = extractContainerName(filePath);

//        if (!isContainerExist(loginEmail, containerName)) throw new NotFoundContainer();
        if (!s3FileService.isFileAlreadyExist(s3Path)) throw new NotFoundFile();

        // db 삭제
        Container container = findContainerByNameAndEmail(containerName, loginEmail);

        File findFile = container.findFileByPrefix(
                extractFilePrefix(filePath)
        );
        fileRepository.delete(findFile);

        // s3 삭제
        s3FileService.deleteFile(loginEmail, filePath);
    }

    @Transactional
    public void updateFile(String loginEmail, String filePath, UpdateFileRequest request) {
        String s3Path = givenPathToS3Path(loginEmail, filePath);

        if (!isContainerExist(loginEmail, extractContainerName(filePath))) throw new NotFoundContainer();
        if (!s3FileService.isFileAlreadyExist(s3Path)) throw new NotFoundFile();

        s3FileService.updateFile(loginEmail, filePath, request.getContent());
    }

    @Transactional
    public void updateFilename(String loginEmail, String filePath, String newFilename) {
        String s3Path = givenPathToS3Path(loginEmail, filePath);
        String newFilePath = createNewFilePath(filePath, newFilename);
        String containerName = extractContainerName(filePath);

//        if (!isContainerExist(loginEmail, containerName)) throw new NotFoundContainer();
        if (!s3FileService.isFileAlreadyExist(s3Path)) throw new NotFoundFile();

        // db rename
        Container container = findContainerByNameAndEmail(containerName, loginEmail);

        File findFile = container.findFileByPrefix(
                extractFilePrefix(filePath)
        );
        findFile.rename(newFilename);

        // s3 rename
        s3FileService.updateFilename(loginEmail, filePath, newFilePath);
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
}
