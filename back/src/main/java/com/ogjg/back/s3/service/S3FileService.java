package com.ogjg.back.s3.service;

import com.ogjg.back.s3.repository.S3FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ogjg.back.common.util.S3PathUtil.createS3PathWithFilePath;

@Service
@RequiredArgsConstructor
public class S3FileService {

    private final S3FileRepository s3FileRepository;
    public void createFile(String email, String filePath) {
        s3FileRepository.putFilePath(
                createS3PathWithFilePath(email, filePath)
        );
    }

    public void deleteFile(String email, String filePath) {
        s3FileRepository.deleteFile(
                createS3PathWithFilePath(email, filePath)
        );
    }
}
