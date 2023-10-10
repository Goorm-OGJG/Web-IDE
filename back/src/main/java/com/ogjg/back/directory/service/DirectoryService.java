package com.ogjg.back.directory.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.directory.dto.request.CreateDirectoryRequest;
import com.ogjg.back.s3entry.service.S3EntryService;
import com.ogjg.back.s3.service.S3DirectoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DirectoryService {

    private final ContainerRepository containerRepository;
    private final S3DirectoryService s3DirectoryService;
    private final S3EntryService s3EntryService;

    @Transactional
    public void createDirectory(Long containerId, String directoryPath, CreateDirectoryRequest request) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();

        s3EntryService.saveDirectoryPath(findContainer, directoryPath, request.getUuid());
        s3DirectoryService.createDirectory(email, directoryPath);
    }

    @Transactional
    public void deleteDirectory(Long containerId, String directoryPath) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();

        s3EntryService.deleteDirectory(findContainer, directoryPath);
        s3DirectoryService.deleteDirectory(email, directoryPath);
    }

    @Transactional
    public void updateDirectoryName(Long containerId, String directoryPath, String newDirectoryName) {
        Container findContainer = findContainerById(containerId);
        String email = findContainer.getUser().getEmail();

        s3EntryService.renameDirectory(findContainer, directoryPath, newDirectoryName);
        s3DirectoryService.updateDirectoryName(email, directoryPath, newDirectoryName);
    }

    private Container findContainerById(Long containerId) {
        return containerRepository.findById(containerId)
                .orElseThrow(NotFoundContainer::new);
    }
}
