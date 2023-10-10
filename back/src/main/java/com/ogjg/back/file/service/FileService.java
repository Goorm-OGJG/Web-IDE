package com.ogjg.back.file.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.file.dto.request.UpdateFileRequest;
import com.ogjg.back.s3entry.service.S3EntryService;
import com.ogjg.back.s3.service.S3FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ogjg.back.common.util.PathUtil.createNewFilePath;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {
    private final ContainerRepository containerRepository;
    private final S3FileService s3FileService;
    private final S3EntryService s3EntryService;

    @Transactional
    public void createFile(Long containerId, String filePath, String uuid) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();

        s3EntryService.saveFilePath(findContainer, filePath, uuid);
        s3FileService.createFileKey(email, filePath);
    }

    @Transactional
    public void deleteFile(Long containerId, String filePath) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();

        s3EntryService.deleteFilePath(findContainer, filePath);
        s3FileService.deleteFile(email, filePath);
    }

    @Transactional
    public void updateFile(Long containerId, String filePath, UpdateFileRequest request) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();

        s3FileService.updateFile(email, filePath, request.getContent());
    }

    @Transactional
    public void updateFilename(Long containerId, String filePath, String newFilename) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();
        String newFilePath = createNewFilePath(filePath, newFilename);

        s3EntryService.updateFilename(findContainer, filePath, newFilename);
        s3FileService.updateFileKey(email, filePath, newFilePath);
    }

    private Container findContainerById(Long containerId) {
        return containerRepository.findById(containerId)
                .orElseThrow(NotFoundContainer::new);
    }
}
