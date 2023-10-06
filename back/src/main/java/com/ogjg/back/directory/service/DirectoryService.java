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
    public void createDirectory(Long containerId, String directoryPath, CreateDirectoryRequest request) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();
        String s3Path = givenPathToS3Path(email, directoryPath);

//        if (!isContainerExist(email, findContainer.getName())) throw new NotFoundContainer();
        if (s3DirectoryService.isDirectoryAlreadyExist(s3Path)) throw new DirectoryAlreadyExists();

        directoryRepository.save(Path.builder()
                .container(findContainer)
                .path(extractDirectoryPrefix(directoryPath))
                .name(extractDirectoryName(directoryPath))
                .uuid(request.getUuid())
                .build());

        s3DirectoryService.createDirectory(s3Path);
    }

    @Transactional
    public void deleteDirectory(Long containerId, String directoryPath) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();
        String s3Path = givenPathToS3Path(email, directoryPath);

        if (!s3DirectoryService.isDirectoryAlreadyExist(s3Path)) throw new NotFoundDirectory();

        // db 삭제
        pathRepository.findByPathStartsWith(directoryPath).stream()
                .forEach(pathRepository::delete);

        Path findPath = findContainer.findPath(
                extractDirectoryPrefix(directoryPath),
                extractDirectoryName(directoryPath)
        );
        pathRepository.delete(findPath);

        s3DirectoryService.deleteDirectory(s3Path);
    }

    @Transactional
    public void updateDirectoryName(Long containerId, String directoryPath, String newDirectoryName) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();

        String originS3Path = givenPathToS3Path(email, directoryPath);
        String newS3Path = createNewDirectoryPath(originS3Path, newDirectoryName);

        if (!s3DirectoryService.isDirectoryAlreadyExist(originS3Path)) throw new NotFoundDirectory();

        // db rename
        List<Path> changeTargetList = pathRepository.findByPathStartsWith(directoryPath);

        String newAncestorPath = createNewDirectoryPath(directoryPath, newDirectoryName);
        changeTargetList.stream()
                .map((path) -> path.renameAncestor(
                        directoryPath,
                        newAncestorPath
                )).toList();

        Path findPath = findContainer.findPath(
                extractDirectoryPrefix(directoryPath),
                extractDirectoryName(directoryPath)
        );
        findPath.rename(newDirectoryName + DELIMITER);

        s3DirectoryService.updateDirectoryName(originS3Path, newS3Path);
    }

    private Container findContainerById(Long containerId) {
        return containerRepository.findById(containerId)
                .orElseThrow(NotFoundContainer::new);
    }
}
