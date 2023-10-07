package com.ogjg.back.s3.service;

import com.ogjg.back.directory.exception.DirectoryAlreadyExists;
import com.ogjg.back.directory.exception.NotFoundDirectory;
import com.ogjg.back.s3.repository.S3DirectoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.util.List;

import static com.ogjg.back.common.util.PathUtil.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3DirectoryService {

    private final S3DirectoryRepository s3DirectoryRepository;

    @Transactional
    public void createDirectory(String email, String directoryPath) {
        String s3Key = pathToS3Key(email, directoryPath);

        if (isDirectoryAlreadyExist(s3Key)) throw new DirectoryAlreadyExists();
        s3DirectoryRepository.putDirectoryPath(s3Key);
    }

    @Transactional(readOnly = true)
    public boolean isDirectoryAlreadyExist(String s3Key) {
        return s3DirectoryRepository.isDirectoryExist(s3Key);
    }

    @Transactional
    public void deleteDirectory(String email, String directoryPath) {
        String s3Key = pathToS3Key(email, directoryPath);

        if (!isDirectoryAlreadyExist(s3Key)) throw new NotFoundDirectory();

        s3DirectoryRepository.deleteObjectsWithPrefix(s3Key);
    }

    @Transactional
    public void updateDirectoryName(String email, String directoryPath, String newDirectoryName) {
        String originS3Key = pathToS3Key(email, directoryPath);
        String newS3Key = createNewDirectoryPath(originS3Key, newDirectoryName);
        if (!isDirectoryAlreadyExist(originS3Key)) throw new NotFoundDirectory();

        List<S3Object> objects = s3DirectoryRepository.getObjectsBy(originS3Key);
        copyAndPasteObjects(objects, originS3Key, newS3Key);
    }

    private void copyAndPasteObjects(List<S3Object> objects, String originPrefix, String newS3Prefix) {
        for (S3Object s3Object : objects) {
            String newKey = createNewKey(s3Object.key(), originPrefix, newS3Prefix);

            log.debug("newKey={}", newKey);

            s3DirectoryRepository.copyObject(s3Object, newKey);
            s3DirectoryRepository.deleteObject(s3Object);
        }
    }
}
