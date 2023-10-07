package com.ogjg.back.s3.service;

import com.ogjg.back.file.exception.FileAlreadyExists;
import com.ogjg.back.file.exception.NotFoundFile;
import com.ogjg.back.s3.repository.S3FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.PathUtil.pathToS3Key;

@Service
@RequiredArgsConstructor
public class S3FileService {

    private final S3FileRepository s3FileRepository;

    @Transactional
    public void createFileKey(String email, String filePath) {
        String s3Key = pathToS3Key(email, filePath);

        if (isFileAlreadyExist(s3Key)) throw new FileAlreadyExists();
        s3FileRepository.putFileKey(s3Key);
    }

    @Transactional
    public void deleteFile(String email, String filePath) {
        String s3Key = pathToS3Key(email, filePath);

        if (!isFileAlreadyExist(s3Key)) throw new NotFoundFile();
        s3FileRepository.deleteFile(s3Key);
    }
    @Transactional
    public void updateFile(String email, String filePath, String content) {
        String s3Key = pathToS3Key(email, filePath);

        if (!isFileAlreadyExist(s3Key)) throw new NotFoundFile();
        s3FileRepository.putFile(s3Key, content);
    }

    @Transactional
    public void updateFileKey(String email, String filePath, String newFilePath) {
        String s3Key = pathToS3Key(email, filePath);
        String newS3Key = pathToS3Key(email, newFilePath);

        if (!isFileAlreadyExist(s3Key)) throw new NotFoundFile();
        s3FileRepository.renameKey(s3Key, newS3Key);
    }

    @Transactional(readOnly = true)
    public boolean isFileAlreadyExist(String s3Key) {
        return s3FileRepository.isFileExist(s3Key);
    }
}
