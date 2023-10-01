package com.ogjg.back.s3.service;

import com.ogjg.back.s3.repository.S3DirectoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.S3PathUtil.givenPathToS3Path;

@Service
@RequiredArgsConstructor
public class S3DirectoryService {

    private final S3DirectoryRepository s3DirectoryRepository;

    @Transactional
    public void createDirectory(String email, String directoryPath) {
        s3DirectoryRepository.putDirectoryPath(
                givenPathToS3Path(email, directoryPath)
        );
    }

    @Transactional(readOnly = true)
    public boolean isDirectoryAlreadyExist(String s3Path) {
        return s3DirectoryRepository.isDirectoryExist(s3Path);
    }

    @Transactional
    public void deleteDirectory(String email, String directoryPath) {
        s3DirectoryRepository.deleteObjectsWithPrefix(
                givenPathToS3Path(email, directoryPath)
        );
    }
}
