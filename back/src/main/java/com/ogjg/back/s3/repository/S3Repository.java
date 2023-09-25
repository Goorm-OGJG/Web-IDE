package com.ogjg.back.s3.repository;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class S3Repository {

    @Value("${cloud.aws.credentials.bucket-name}")
    private String bucketName;
    private final AmazonS3Client amazonS3Client;

    public void deleteObjectsWithPrefix(String prefix) {
        ListObjectsV2Request request = new ListObjectsV2Request().withBucketName(bucketName).withPrefix(prefix);
        ListObjectsV2Result result;

        do {
            result = amazonS3Client.listObjectsV2(request);

            for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
                amazonS3Client.deleteObject(bucketName, objectSummary.getKey());
            }

            // 최대 키 개수 단위인 1000개 넘기면 다음 batch로 가야한다.
            request.setContinuationToken(result.getNextContinuationToken());
        } while (result.isTruncated()); // 객체가 더 있는지 확인
    }

    public Optional<String> uploadFile(MultipartFile multipartFile, String fileName) {
        String accessUrl = null;
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getInputStream().available());

            amazonS3Client.putObject(bucketName, fileName, multipartFile.getInputStream(), objectMetadata);

            accessUrl = amazonS3Client.getUrl(bucketName, fileName).toString();
        } catch(Exception e) {
            log.info("error message={}",e.getMessage());
        }

        return Optional.of(accessUrl);
    }
}
