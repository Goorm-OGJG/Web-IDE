package com.ogjg.back.s3.service;

import com.ogjg.back.s3.repository.S3DirectoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.util.List;

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

    @Transactional
    public void updateDirectoryName(String originS3Prefix, String newS3Prefix) {
        List<S3Object> objects = s3DirectoryRepository.getObjectsBy(originS3Prefix);

        s3DirectoryRepository.copyAndPasteObjects(objects, originS3Prefix, newS3Prefix);
    }
}
