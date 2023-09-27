package com.ogjg.back.container.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import com.ogjg.back.container.dto.response.ContainerCheckNameResponse;
import com.ogjg.back.container.dto.response.ContainerGetResponse;
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

import java.util.List;

import static com.ogjg.back.common.util.S3PathUtil.createEmailRemovedKey;
import static com.ogjg.back.common.util.S3PathUtil.createS3Directory;

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

        if (isContainerNameDuplicated(request.getName(), loginEmail)) {
            throw new DuplicatedContainerName();
        }

        // todo: 언어별 디렉토리 내려주기
        // s3에 명시적으로 빈 경로 데이터를 만들어줘야 후에 listObject로 조회가 가능하다.
        s3ContainerService.createContainer(
                createS3Directory(loginEmail, request.getName())
        );

        Container container = request.toContainer(user);
        containerRepository.save(container);

        // todo: 디렉토리 구조 db에 반영
    }

    protected boolean isContainerNameDuplicated(String containerName, String loginEmail) {
        return containerRepository.findByNameAndEmail(containerName, loginEmail)
                .isPresent();
    }

    @Transactional(readOnly = true)
    public ContainerCheckNameResponse checkDuplication(String containerName, String loginEmail) {
        return ContainerCheckNameResponse.of(
                isContainerNameDuplicated(containerName, loginEmail)
        );
    }

    @Transactional
    public ContainerGetResponse getAllFilesAndDirectories(Long containerId, String loginEmail) {
        Container container = containerRepository.findById(containerId)
                .orElseThrow(() -> new NotFoundContainer());

        String prefix = createS3Directory(loginEmail, container.getName());
        List<String> allKeys = s3ContainerService.getAllKeysByPrefix(prefix);

        for (String key : allKeys) {
            log.debug("key ={}", key);
        }

        // 맨 앞에 이메일 부분이 절삭된 key 목록을 만든다.
        List<String> parsedKeys = parse(allKeys, loginEmail);

        return ContainerGetResponse.builder()
                .language(container.getLanguage())
                .treeData(s3ContainerService.buildTreeFromKeys(parsedKeys))
                .fileData(s3ContainerService.getFileData(allKeys, loginEmail))
                .directories(s3ContainerService.getDirectories(parsedKeys))
                .build();
    }

    private List<String> parse(List<String> allKeys, String email) {
        return allKeys.stream()
                .map((key) -> createEmailRemovedKey(key, email))
                .toList();
    }
}
