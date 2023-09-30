package com.ogjg.back.s3.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.net.URLConnection;

@Slf4j
@Repository
@RequiredArgsConstructor
public class S3FileRepository {

    @Value("${cloud.aws.credentials.bucket-name}")
    private String bucketName;

    private final S3Client s3Client;

    public void putFilePath(String filePath) {
        try {
            // 파일 확장자를 통해 MIME 타입을 가져옴
            String mimeType = URLConnection.guessContentTypeFromName(filePath);
            if (mimeType == null) {
                mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            // S3에 파일 업로드
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(filePath)
                    .contentType(mimeType)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromString(filePath));

        } catch (Exception e) {
            log.error("error message={}", e.getMessage());
        }
    }

}
