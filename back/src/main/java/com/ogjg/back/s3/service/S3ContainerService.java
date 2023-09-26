package com.ogjg.back.s3.service;

import com.ogjg.back.container.dto.response.ContainerFileResponse;
import com.ogjg.back.s3.exception.S3ContainerUploadException;
import com.ogjg.back.s3.repository.S3ContainerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3ContainerService {

    private final S3ContainerRepository s3ContainerRepository;

    @Transactional
    public String createContainer(String directory) {
        return s3ContainerRepository.uploadDirectory(directory)
                .orElseThrow(() -> new S3ContainerUploadException());
    }

    @Transactional(readOnly = true)
    public List<S3Object> getAllFilesAndDirectories(String loginEmail) {
        return s3ContainerRepository.getAllByPrefix(loginEmail);
    }

    // todo: 병렬처리 등 요청수 줄일 방법 고려하기
    @Transactional(readOnly = true)
    public List<ContainerFileResponse> getAllContents(List<String> keys) {
        return keys.stream()
                .map(s3ContainerRepository::getFile)
                .toList();
    }
}
