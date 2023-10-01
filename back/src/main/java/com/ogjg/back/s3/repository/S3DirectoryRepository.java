package com.ogjg.back.s3.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

@Slf4j
@Repository
@RequiredArgsConstructor
public class S3DirectoryRepository {
    public static final String EMPTY = "";
    @Value("${cloud.aws.credentials.bucket-name}")
    private String bucketName;

    private final S3Client s3Client;

    public void putDirectoryPath(String directoryPath) {
        try {
            // S3에 디렉토리 업로드
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(directoryPath)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromString(EMPTY));

        } catch (Exception e) {
            log.error("error message={}", e.getMessage());
        }
    }

    public boolean isDirectoryExist(String s3Path) {
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

    public void deleteObjectsWithPrefix(String prefix) {
        try {
            ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
                    .bucket(bucketName)
                    .prefix(prefix)
                    .build();

            s3Client.listObjectsV2(listObjectsV2Request).contents().stream()
                    .map((content) -> toDeleteObjectRequest(content))
                    .forEach((request) -> s3Client.deleteObject(request));

        } catch (Exception e) {
            log.error("error message={}",e.getMessage());
        }
    }

    private DeleteObjectRequest toDeleteObjectRequest(S3Object content) {
        return DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(content.key())
                .build();
    }
}
