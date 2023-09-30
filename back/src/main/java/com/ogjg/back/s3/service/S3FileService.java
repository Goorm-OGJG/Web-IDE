package com.ogjg.back.s3.service;

import com.ogjg.back.s3.repository.S3FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.S3PathUtil.createS3PathWithFilePath;

@Service
@RequiredArgsConstructor
public class S3FileService {

    private final S3FileRepository s3FileRepository;

    @Transactional
    public void createFile(String email, String filePath) {
        s3FileRepository.putFilePath(
                createS3PathWithFilePath(email, filePath)
        );
    }

    @Transactional
    public void deleteFile(String email, String filePath) {
        s3FileRepository.deleteFile(
                createS3PathWithFilePath(email, filePath)
        );
    }
    @Transactional
    public void updateFile(String email, String filePath, String content) {
        s3FileRepository.putFile(
                createS3PathWithFilePath(email, filePath),
                content
        );
    }
}
