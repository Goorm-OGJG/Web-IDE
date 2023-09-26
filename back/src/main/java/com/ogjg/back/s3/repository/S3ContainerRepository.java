package com.ogjg.back.s3.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class S3ContainerRepository {
    @Value("${cloud.aws.credentials.bucket-name}")
    private String bucketName;
    private final S3Client s3Client;

    public Optional<String> uploadDirectory(String directoryName) {
        String accessUrl = null;
        try {
            PutObjectRequest putObjRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(directoryName)
                    .build();

            s3Client.putObject(putObjRequest,
                    RequestBody.fromString(directoryName));

            accessUrl = getUrl(directoryName);
            log.info("accessUrl={}", accessUrl);

        } catch (Exception e) {
            log.error("error message={}", e.getMessage());
        }

        return Optional.of(accessUrl);
    }

    private String getUrl(String fileName) {
        GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        return s3Client.utilities()
                .getUrl(getUrlRequest).toString();
    }
}
