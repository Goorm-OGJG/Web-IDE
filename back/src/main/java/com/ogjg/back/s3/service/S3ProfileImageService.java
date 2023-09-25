package com.ogjg.back.s3.service;

import com.ogjg.back.s3.exception.S3ImageUploadException;
import com.ogjg.back.s3.repository.S3Repository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3ProfileImageService {
    private final S3Repository s3Repository;

    /**
     * 기존에 존재하는 프로필 이미지를 삭제하고, 새 이미지를 저장한다.
     */
    @Transactional
    public String saveImage(MultipartFile multipartFile, String email) {
        String originalName = multipartFile.getOriginalFilename();

        // 컨테이너 이름에 . 을 넣을수 없다. image. 을 prefix로 이미지를 지우고 다시 생성한다.
        String prefix = email + "/image.";
        s3Repository.deleteObjectsWithPrefix(prefix);

        String fileName = prefix + extractExtension(originalName);
        String accessUrl = s3Repository.uploadFile(multipartFile, fileName)
                .orElseThrow(() -> new S3ImageUploadException());

        return accessUrl;
    }

    private String extractExtension(String originName) {
        int index = originName.lastIndexOf('.');

        return originName.substring(index + 1); // .제외한 확장자만 추출한다.
    }
}
