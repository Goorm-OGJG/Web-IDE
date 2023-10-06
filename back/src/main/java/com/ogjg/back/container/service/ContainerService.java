package com.ogjg.back.container.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import com.ogjg.back.container.dto.request.ContainerGetDirectoryResponse;
import com.ogjg.back.container.dto.response.ContainerCheckNameResponse;
import com.ogjg.back.container.dto.response.ContainerGetFileResponse;
import com.ogjg.back.container.dto.response.ContainerGetResponse;
import com.ogjg.back.container.dto.response.ContainersResponse;
import com.ogjg.back.container.exception.DuplicatedContainerName;
import com.ogjg.back.container.exception.NotFoundContainer;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.directory.exception.NotFoundDirectory;
import com.ogjg.back.directory.repository.DirectoryRepository;
import com.ogjg.back.file.domain.Path;
import com.ogjg.back.file.exception.NotFoundFile;
import com.ogjg.back.file.repository.PathRepository;
import com.ogjg.back.s3.repository.S3ContainerRepository;
import com.ogjg.back.s3.service.S3ContainerService;
import com.ogjg.back.s3.service.S3DirectoryService;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.exception.NotFoundUser;
import com.ogjg.back.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.ogjg.back.common.util.S3PathUtil.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContainerService {
    private final UserRepository userRepository;
    private final ContainerRepository containerRepository;
    private final PathRepository pathRepository;
    private final S3ContainerService s3ContainerService;
    private final S3ContainerRepository s3ContainerRepository;
    private final S3DirectoryService s3DirectoryService;
    private final DirectoryRepository directoryRepository;

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
                createContainerPrefix(loginEmail, request.getName())
        );

        Container container = request.toContainer(user);
        containerRepository.save(container);

        String containerPath = DELIMITER + request.getName() + DELIMITER;
        directoryRepository.save(Path.builder()
                .container(container)
                .path(extractDirectoryPrefix(containerPath))
                .name(extractDirectoryName(containerPath))
                .uuid(UUID.randomUUID().toString())
                .build());
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
    public ContainerGetResponse getAllFilesAndDirectories(Long containerId) {
        Container container = containerRepository.findById(containerId)
                .orElseThrow(() -> new NotFoundContainer());

        String email = container.getUser().getEmail();

        String prefix = createContainerPrefix(email, container.getName());
        List<String> allKeys = s3ContainerService.getAllKeysByPrefix(prefix);

        for (String key : allKeys) {
            log.info("key = {}", key);
        }

        // 맨 앞에 이메일 부분이 절삭된 key 목록을 만든다.
        List<String> emailRemovedKeys = parse(allKeys, email);

        return ContainerGetResponse.builder()
                .language(container.getLanguage())
                .treeData(s3ContainerService.buildTreeFromKeys(emailRemovedKeys))
                .fileData(getFileData(containerId, email, allKeys))
                .directories(getDirectories(containerId, emailRemovedKeys))
                .build();
    }

    /**
     * 파일 데이터 가져오기
     * - 파일 데이터의 경우 s3에서 fullKey로 조회해서 값을 가져와야해서 파싱되지 않은 키가 필요하다.
     */
    private List<ContainerGetFileResponse> getFileData(Long containerId, String loginEmail, List<String> allKeys) {
        List<String> fileKeys = allKeys.stream()
                .filter((key) -> isFile(key))
                .toList();

        List<ContainerGetFileResponse> fileData = fileKeys.stream()
                .map((key) -> ContainerGetFileResponse.builder()
                        .filePath(createEmailRemovedKey(key, loginEmail))
                        .content(s3ContainerRepository.getFileContent(key))
                        .uuid(pathRepository.findUuid(
                                containerId,
                                extractFilePrefix(
                                        createEmailRemovedKey(key, loginEmail)
                                ),
                                extractFilename(key)
                        ).orElseThrow(() -> new NotFoundFile("존재하지 않는 파일입니다. containerId="+ containerId +", key ="+ extractFilePrefix(createEmailRemovedKey(key, loginEmail)))))
                        .build())
                .toList();
        return fileData;
    }

    private List<ContainerGetDirectoryResponse> getDirectories(Long containerId, List<String> emailRemovedKeys) {
        return emailRemovedKeys.stream()
                .filter((parsedKey) -> !isFile(parsedKey))
                .map((emailRemovedKey) -> ContainerGetDirectoryResponse.builder()
                        .directory(emailRemovedKey)
                        .uuid(pathRepository.findUuid(
                                containerId,
                                extractDirectoryPrefix(emailRemovedKey),
                                extractDirectoryName(emailRemovedKey)
                                ).orElseThrow(() -> new NotFoundDirectory("해당 디렉토리가 DB에 존재하지 않습니다. prefix="+extractDirectoryPrefix(emailRemovedKey)+ ", filename="+ extractDirectoryName(emailRemovedKey)))
                        ).build())
                .toList();
    }

    private List<String> parse(List<String> allKeys, String email) {
        return allKeys.stream()
                .map((key) -> createEmailRemovedKey(key, email))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ContainersResponse> searchContainers(String query, String email) {

        if (query.isEmpty()) {
            List<Container> containers = containerRepository.findAllByUserEmail(email);
            return containers.stream()
                    .map(ContainersResponse::new)
                    .toList();
        }

        List<Container> containers = containerRepository.findAllByNameContainingAndUserEmail(query, email);
        return containers.stream()
                .map(ContainersResponse::new)
                .toList();
    }

    @Transactional
    public boolean updatePrivateStatus(Long containerId, String email) {
        Container container = containerRepository.findById(containerId)
                .orElseThrow(NotFoundContainer::new);

        container.updatePrivate(email);
        containerRepository.save(container);
        return container.getIsPrivate();
    }

    @Transactional
    public void updateContainerInfo(Long containerId, String info, String email) {
        Container container = containerRepository.findById(containerId)
                .orElseThrow(() -> new NotFoundContainer("컨테이너가 존재하지 않습니다."));

        container.updateDescription(email, info);
        containerRepository.save(container);
    }

    @Transactional
    public boolean updatePinStatus(Long containerId, String email) {
        Container container = containerRepository.findById(containerId)
                .orElseThrow(() -> new NotFoundContainer("컨테이너가 존재하지 않습니다."));

        container.updatePinned(email);
        containerRepository.save(container);
        return container.getIsPinned();
    }

    @Transactional
    public void deleteContainer(Long containerId, String email) {
        Container container = containerRepository.findById(containerId)
                .orElseThrow(() -> new NotFoundContainer("컨테이너가 존재하지 않습니다."));

        String containerPrefix = createContainerPrefix(email, container.getName());
        if (!s3DirectoryService.isDirectoryAlreadyExist(containerPrefix)) throw new NotFoundDirectory("S3에 존재하지 않는 컨테이너 경로입니다.");

        s3ContainerService.deleteAllByPrefix(containerPrefix);

        containerRepository.delete(container);
    }
}
