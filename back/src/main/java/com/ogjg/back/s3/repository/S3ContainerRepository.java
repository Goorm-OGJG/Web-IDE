package com.ogjg.back.s3.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.util.List;
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
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(directoryName)
                    .build();

            s3Client.putObject(putObjectRequest,
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

    public List<S3Object> getAllObjectsByPrefix(String prefix) {
        ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(prefix)
                .build();

        return s3Client.listObjectsV2(listObjectsV2Request).contents();
    }

    public String getFileContent(String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        return s3Client.getObject(getObjectRequest, ResponseTransformer.toBytes()).asUtf8String();
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
