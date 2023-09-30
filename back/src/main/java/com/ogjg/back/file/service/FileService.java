package com.ogjg.back.file.service;

import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.file.dto.request.CreateFileRequest;
import com.ogjg.back.s3.service.S3FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.S3PathUtil.extractContainerName;

@Service
@RequiredArgsConstructor
public class FileService {
    private final ContainerRepository containerRepository;
    private final S3FileService s3FileService;

    @Transactional
    public void createFile(String loginEmail, CreateFileRequest request) {
        String filePath = request.getFilePath();
        containerRepository.findByNameAndEmail(extractContainerName(filePath), loginEmail)
                .orElseThrow(NotFoundContainer::new);

        s3FileService.createFile(loginEmail, filePath);
    }
}
