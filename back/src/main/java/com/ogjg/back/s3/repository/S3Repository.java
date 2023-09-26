package com.ogjg.back.s3.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.util.*;

@Slf4j
@Repository
@RequiredArgsConstructor
public class S3Repository {

    @Value("${cloud.aws.credentials.bucket-name}")
    private String bucketName;
    private final S3Client s3Client;

    public Optional<String> uploadFile(MultipartFile file, String filename) {
        String accessUrl = null;
        try {
            Map<String, String> metadata = new HashMap<>();
            metadata.put("x-amz-meta-myVal", "test");
            PutObjectRequest putObjRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(filename)
                    .metadata(metadata)
                    .build();

            s3Client.putObject(putObjRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            accessUrl = getUrl(filename);
            log.info("accessUrl={}",accessUrl);

        } catch (Exception e) {
            log.error("error message={}",e.getMessage());
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

    public void deleteBatchWithPrefix(String prefix) {
        try {
            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
                    .bucket(bucketName)
                    .prefix(prefix)
                    .build();

            ListObjectsResponse listObjectsResponse;
            do {
                listObjectsResponse = s3Client.listObjects(listObjectsRequest);
                List<S3Object> s3Objects = listObjectsResponse.contents();

                List<ObjectIdentifier> toDelete = new ArrayList<>();
                for (S3Object s3Object : s3Objects) {
                    ObjectIdentifier objIdentifier = ObjectIdentifier.builder().key(s3Object.key()).build();
                    toDelete.add(objIdentifier);
                }

                if (!toDelete.isEmpty()) {
                    DeleteObjectsRequest deleteObjectsRequest = DeleteObjectsRequest.builder()
                            .bucket(bucketName)
                            .delete(Delete.builder().objects(toDelete).build())
                            .build();

                    s3Client.deleteObjects(deleteObjectsRequest);
                }

                listObjectsRequest = ListObjectsRequest.builder()
                        .bucket(bucketName)
                        .prefix(prefix)
                        .marker(listObjectsResponse.nextMarker())
                        .build();

            } while (listObjectsResponse.isTruncated());

        } catch (Exception e) {
            log.error("error message={}",e.getMessage());
        }
    }
}
