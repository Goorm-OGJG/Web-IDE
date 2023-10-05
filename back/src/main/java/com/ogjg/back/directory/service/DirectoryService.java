package com.ogjg.back.directory.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.directory.dto.request.CreateDirectoryRequest;
import com.ogjg.back.directory.exception.DirectoryAlreadyExists;
import com.ogjg.back.directory.exception.NotFoundDirectory;
import com.ogjg.back.directory.repository.DirectoryRepository;
import com.ogjg.back.file.domain.Path;
import com.ogjg.back.file.repository.PathRepository;
import com.ogjg.back.s3.service.S3DirectoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ogjg.back.common.util.S3PathUtil.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class DirectoryService {

    private final ContainerRepository containerRepository;
    private final S3DirectoryService s3DirectoryService;
    private final DirectoryRepository directoryRepository;
    private final PathRepository pathRepository;

    @Transactional
    public void createDirectory(String loginEmail, String directoryPath, CreateDirectoryRequest request) {
        String s3Path = givenPathToS3Path(loginEmail, directoryPath);

        String containerName = extractContainerName(directoryPath);
        if (!isContainerExist(loginEmail, containerName)) throw new NotFoundContainer();
        if (s3DirectoryService.isDirectoryAlreadyExist(s3Path)) throw new DirectoryAlreadyExists();

        Container container = findContainerByNameAndEmail(containerName, loginEmail);

        directoryRepository.save(Path.builder()
                .container(container)
                .path(extractDirectoryPrefix(directoryPath))
                .name(extractDirectoryName(directoryPath))
                .uuid(request.getUuid())
                .build());

        s3DirectoryService.createDirectory(loginEmail, directoryPath);
    }

    @Transactional
    public void deleteDirectory(String loginEmail, String directoryPath) {
        String s3Path = givenPathToS3Path(loginEmail, directoryPath);
        String containerName = extractContainerName(directoryPath);

        if (!isContainerExist(loginEmail, containerName)) throw new NotFoundContainer();
        if (!s3DirectoryService.isDirectoryAlreadyExist(s3Path)) throw new NotFoundDirectory();

        // db 삭제
        Container container = findContainerByNameAndEmail(containerName, loginEmail);

        List<Path> deleteTargetList = pathRepository.findByPathStartsWith(directoryPath);
        deleteTargetList.stream()
                .forEach(pathRepository::delete);

        Path findPath = container.findPath(
                extractDirectoryPrefix(directoryPath),
                extractDirectoryName(directoryPath)
        );
        pathRepository.delete(findPath);

        s3DirectoryService.deleteDirectory(loginEmail, directoryPath);
    }

    @Transactional
    public void updateDirectoryName(String loginEmail, String directoryPath, String newDirectoryName) {
        String originS3Path = givenPathToS3Path(loginEmail, directoryPath);
        String newS3Path = createNewDirectoryPath(originS3Path, newDirectoryName);
        String containerName = extractContainerName(directoryPath);

        if (!isContainerExist(loginEmail, containerName)) throw new NotFoundContainer();
        if (!s3DirectoryService.isDirectoryAlreadyExist(originS3Path)) throw new NotFoundDirectory();

        // db rename
        Container container = findContainerByNameAndEmail(containerName, loginEmail);

        // dPath  /my-container1/bird/bird/
        List<Path> changeTargetList = pathRepository.findByPathStartsWith(directoryPath);

        String newAncestorPath = createNewDirectoryPath(directoryPath, newDirectoryName);
        changeTargetList.stream()
                .map((path) -> path.renameAncestor(
                        directoryPath,
                        newAncestorPath
                )).toList();

        Path findPath = container.findPath(
                extractDirectoryPrefix(directoryPath),
                extractDirectoryName(directoryPath)
        );
        findPath.rename(newDirectoryName + DELIMITER);

        s3DirectoryService.updateDirectoryName(originS3Path, newS3Path);
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
