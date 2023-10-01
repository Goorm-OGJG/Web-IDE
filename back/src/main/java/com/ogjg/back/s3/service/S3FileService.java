package com.ogjg.back.s3.service;

import com.ogjg.back.s3.repository.S3FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.S3PathUtil.givenPathToS3Path;

@Service
@RequiredArgsConstructor
public class S3FileService {

    private final S3FileRepository s3FileRepository;

    @Transactional
    public void createFile(String email, String filePath) {
        s3FileRepository.putFilePath(
                givenPathToS3Path(email, filePath)
        );
    }

    @Transactional
    public void deleteFile(String email, String filePath) {
        s3FileRepository.deleteFile(
                givenPathToS3Path(email, filePath)
        );
    }
    @Transactional
    public void updateFile(String email, String filePath, String content) {
        s3FileRepository.putFile(
                givenPathToS3Path(email, filePath),
                content
        );
    }

    @Transactional
    public void updateFilename(String email, String filePath, String newFilePath) {
        s3FileRepository.rename(
                givenPathToS3Path(email, filePath),
                givenPathToS3Path(email, newFilePath)
        );
    }

    @Transactional(readOnly = true)
    public boolean isFileAlreadyExist(String filePath) {
        return s3FileRepository.isFileExist(filePath);
    }
}
