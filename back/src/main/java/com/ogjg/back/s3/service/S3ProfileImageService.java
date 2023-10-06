package com.ogjg.back.s3.service;

import com.ogjg.back.s3.exception.S3ImageUploadException;
import com.ogjg.back.s3.repository.S3ImageUploadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import static com.ogjg.back.common.util.S3PathUtil.createImagePrefix;
import static com.ogjg.back.common.util.S3PathUtil.extractExtension;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3ProfileImageService {
    private final S3ImageUploadRepository s3ImageUploadRepository;

    /**
     * 기존에 존재하는 프로필 이미지를 삭제하고, 새 이미지를 저장한다.
     */
    @Transactional
    public String saveImage(MultipartFile multipartFile, String email) {
        String originalName = multipartFile.getOriginalFilename();

        // 컨테이너 이름에 . 을 넣을수 없다. image. 을 prefix로 이미지를 지우고 다시 생성한다.
        String prefix = createImagePrefix(email);

        s3ImageUploadRepository.deleteObjectsWithPrefix(prefix);

        String filePath = prefix + extractExtension(originalName);
        log.info("fileName={}",filePath);
        return s3ImageUploadRepository.uploadFile(multipartFile, filePath)
                .orElseThrow(() -> new S3ImageUploadException());
    }
}
