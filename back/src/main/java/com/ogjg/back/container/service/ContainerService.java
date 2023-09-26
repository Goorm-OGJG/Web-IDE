package com.ogjg.back.container.service;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.dto.request.ContainerCreateRequest;
import com.ogjg.back.container.dto.response.ContainerNameCheckResponse;
import com.ogjg.back.container.exception.DuplicatedContainerName;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.exception.NotFoundUser;
import com.ogjg.back.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContainerService {

    private final ContainerRepository containerRepository;
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
}
