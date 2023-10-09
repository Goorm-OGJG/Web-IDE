package com.ogjg.back.path.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.file.domain.Path;
import com.ogjg.back.file.exception.NotFoundFile;
import com.ogjg.back.path.repository.PathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ogjg.back.common.util.PathUtil.*;

@Service
@RequiredArgsConstructor
public class PathService {

    private final PathRepository pathRepository;

    @Transactional
    public void saveFilePath(Container container, String filePath, String uuid) {
        pathRepository.save(
                Path.builder()
                        .container(container)
                        .path(extractFilePrefix(filePath))
                        .name(extractFilename(filePath))
                        .uuid(uuid)
                        .build()
        );
    }

    @Transactional
    public void deleteFilePath(Container container, String filePath) {
        Path findPath = container.findPathBy(
                extractFilePrefix(filePath),
                extractFilename(filePath)
        );
        pathRepository.delete(findPath);
    }

    @Transactional
    public void updateFilename(Container container, String filePath, String newFilename) {
        Path findPath = container.findPathBy(
                extractFilePrefix(filePath),
                extractFilename(filePath)
        );
        findPath.rename(newFilename);
    }

    @Transactional
    public void saveDirectoryPath(Container container, String directoryPath, String uuid) {
        pathRepository.save(Path.builder()
                .container(container)
                .path(extractDirectoryPrefix(directoryPath))
                .name(extractDirectoryName(directoryPath))
                .uuid(uuid)
                .build());
    }

    @Transactional
    public void deleteDirectory(Container container, String directoryPath) {
        Path findPath = container.findPathBy(
                extractDirectoryPrefix(directoryPath),
                extractDirectoryName(directoryPath)
        );
        pathRepository.delete(findPath);

        pathRepository.findByPathStartsWith(directoryPath).stream()
                .forEach(pathRepository::delete);
    }

    @Transactional
    public void renameDirectory(Container container, String directoryPath, String newDirectoryName) {
        Path findPath = container.findPathBy(
                extractDirectoryPrefix(directoryPath),
                extractDirectoryName(directoryPath)
        );
        findPath.rename(newDirectoryName + DELIMITER);

        renameAllPathInDirectory(directoryPath, newDirectoryName);
    }

    private void renameAllPathInDirectory(String directoryPath, String newDirectoryName) {
        List<Path> toChangePaths = pathRepository.findByPathStartsWith(directoryPath);
        String newPrefix = createNewDirectoryPath(directoryPath, newDirectoryName);

        toChangePaths.stream()
                .map((path) -> path.rename(directoryPath, newPrefix))
                .toList();
    }

    public String findUuid(Long containerId, String filePrefix, String filename) {
        return pathRepository.findUuid(containerId, filePrefix, filename)
                .orElseThrow(() -> new NotFoundFile("존재하지 않는 파일입니다. containerId=" + containerId + ", filePrefix =" + filePrefix));
    }
}
