package com.ogjg.back.s3.service;

import com.ogjg.back.s3.exception.S3ContainerUploadException;
import com.ogjg.back.s3.repository.S3ContainerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<String> getAllKeysByPrefix(String prefix) {
        return s3ContainerRepository.getAllObjectsByPrefix(prefix).stream()
                .map((s3Object) -> s3Object.key())
                .toList();
    }

    @Transactional
    public void deleteAllByPrefix(String prefix) {
        s3ContainerRepository.deleteObjectsWithPrefix(prefix);
    }
}
