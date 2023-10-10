package com.ogjg.back.s3entry.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.s3entry.domain.S3Entry;
import com.ogjg.back.s3entry.repository.S3EntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.ogjg.back.common.util.PathUtil.*;

@Service
@RequiredArgsConstructor
public class S3EntryService {

    private final S3EntryRepository s3EntryRepository;

    @Transactional
    public void saveFilePath(Container container, String filePath, String uuid) {
        s3EntryRepository.save(
                S3Entry.builder()
                        .container(container)
                        .path(extractFilePrefix(filePath))
                        .name(extractFilename(filePath))
                        .uuid(uuid)
                        .build()
        );
    }

    @Transactional
    public void deleteFilePath(Container container, String filePath) {
        S3Entry findS3Entry = container.findS3EntryBy(
                extractFilePrefix(filePath),
                extractFilename(filePath)
        );
        s3EntryRepository.delete(findS3Entry);
    }

    @Transactional
    public void updateFilename(Container container, String filePath, String newFilename) {
        S3Entry findS3Entry = container.findS3EntryBy(
                extractFilePrefix(filePath),
                extractFilename(filePath)
        );
        findS3Entry.rename(newFilename);
    }

    @Transactional
    public void saveDirectoryPath(Container container, String directoryPath, String uuid) {
        s3EntryRepository.save(S3Entry.builder()
                .container(container)
                .path(extractDirectoryPrefix(directoryPath))
                .name(extractDirectoryName(directoryPath))
                .uuid(uuid)
                .build());
    }

    @Transactional
    public void deleteDirectory(Container container, String directoryPath) {
        S3Entry findS3Entry = container.findS3EntryBy(
                extractDirectoryPrefix(directoryPath),
                extractDirectoryName(directoryPath)
        );
        s3EntryRepository.delete(findS3Entry);

        s3EntryRepository.findByPathStartsWith(directoryPath).stream()
                .forEach(s3EntryRepository::delete);
    }

    @Transactional
    public void renameDirectory(Container container, String directoryPath, String newDirectoryName) {
        S3Entry findS3Entry = container.findS3EntryBy(
                extractDirectoryPrefix(directoryPath),
                extractDirectoryName(directoryPath)
        );
        findS3Entry.rename(newDirectoryName + DELIMITER);

        renameAllPathInDirectory(directoryPath, newDirectoryName);
    }

    private void renameAllPathInDirectory(String directoryPath, String newDirectoryName) {
        List<S3Entry> toChangeS3Entries = s3EntryRepository.findByPathStartsWith(directoryPath);
        String newPrefix = createNewDirectoryPath(directoryPath, newDirectoryName);

        toChangeS3Entries.stream()
                .map((path) -> path.rename(directoryPath, newPrefix))
                .toList();
    }

    public Optional<String> findUuid(Long containerId, String filePrefix, String filename) {
        return s3EntryRepository.findUuid(containerId, filePrefix, filename);
    }
}
