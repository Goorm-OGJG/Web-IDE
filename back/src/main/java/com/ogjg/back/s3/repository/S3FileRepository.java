package com.ogjg.back.s3.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.net.URLConnection;

@Slf4j
@Repository
@RequiredArgsConstructor
public class S3FileRepository {

    public static final String EMPTY = "";
    @Value("${cloud.aws.credentials.bucket-name}")
    private String bucketName;

    private final S3Client s3Client;

    public void putFilePath(String s3Path) {
        try {
            // 파일 확장자를 통해 MIME 타입을 가져옴
            String mimeType = URLConnection.guessContentTypeFromName(s3Path);
            if (mimeType == null) {
                mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            // S3에 파일 업로드
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Path)
                    .contentType(mimeType)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromString(EMPTY));

        } catch (Exception e) {
            log.error("error message={}", e.getMessage());
        }
    }

    public void deleteFile(String s3Path) {
        try {
            DeleteObjectRequest request = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Path)
                    .build();

            s3Client.deleteObject(request);
        } catch (Exception e) {
            log.error("error message={}", e.getMessage());
        }
    }

    public void putFile(String s3Path, String content) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Path)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromString(content));
        } catch (Exception e) {
            log.error("error message={}", e.getMessage());
        }
    }

    public void rename(String s3Path, String newFilePath) {
        log.info("nowFilePath={}", s3Path);
        log.info("newFilePath={}", newFilePath);
        try {
            CopyObjectRequest copyObjectRequest = CopyObjectRequest.builder()
                    .sourceBucket(bucketName)
                    .sourceKey(s3Path)
                    .destinationBucket(bucketName)
                    .destinationKey(newFilePath)
                    .build();

            s3Client.copyObject(copyObjectRequest);

            // 기존 파일 삭
            deleteFile(s3Path);

        } catch (Exception e) {
            log.error("error message={}", e.getMessage());
        }
    }

    public boolean isFileExist(String s3Path) {
        try {
            HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Path)
                    .build();

            s3Client.headObject(headObjectRequest);
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        }
    }
}
