package com.ogjg.back.container.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import com.ogjg.back.container.dto.response.ContainerFileResponse;
import com.ogjg.back.container.dto.response.ContainerGetResponse;
import com.ogjg.back.container.dto.response.ContainerNameCheckResponse;
import com.ogjg.back.container.dto.response.ContainerNodeResponse;
import com.ogjg.back.container.exception.DuplicatedContainerName;
import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.s3.service.S3ContainerService;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.exception.NotFoundUser;
import com.ogjg.back.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContainerService {

    private final ContainerRepository containerRepository;
    private final S3ContainerService s3ContainerService;
    private final UserRepository userRepository;

    @Transactional
    public void createContainer(String loginEmail, ContainerCreateRequest request) {
        User user = userRepository.findByEmail(loginEmail)
                .orElseThrow(() -> new NotFoundUser());

        if (isDuplicated(request.getName(), loginEmail)) {
            throw new DuplicatedContainerName();
        }

        Container container = request.toContainer(user);
        containerRepository.save(container);

        // todo: 필요하다면 디렉토리 구조 db에 반영
    }

    @Transactional(readOnly = true)
    public ContainerNameCheckResponse checkDuplication(String containerName, String loginEmail) {
        return ContainerNameCheckResponse.of(
                isDuplicated(containerName, loginEmail)
        );
    }

    protected boolean isDuplicated(String containerName, String loginEmail) {
       return containerRepository.findByNameAndEmail(containerName, loginEmail)
                .isPresent();
    }

    @Transactional
    public ContainerGetResponse getAllFilesAndDirectories(Long containerId, String loginEmail) {
        Container container = containerRepository.findById(containerId)
                .orElseThrow(() -> new NotFoundContainer());

        String prefix = ("/" + loginEmail)
                .replace('.', '-')
                .replace('@', '-');

        List<S3Object> allData = s3ContainerService.getAllFilesAndDirectories(prefix);

        List<String> allKeys = allData.stream()
                .map((obj) -> obj.key())
                .sorted()
                .toList();

        List<String> fileKeys = allKeys.stream()
                .filter((key) -> key.contains(".")).toList();

        List<ContainerFileResponse> fileData = s3ContainerService.getAllContents(fileKeys);
        List<String> directories = allKeys;

        return ContainerGetResponse.builder()
                .language(container.getLanguage())
                .treeData(ContainerNodeResponse.buildTreeFromS3Keys(allKeys))
                .fileData(fileData)
                .directories(directories)
                .build();
    }
}
