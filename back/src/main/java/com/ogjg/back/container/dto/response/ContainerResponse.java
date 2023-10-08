package com.ogjg.back.container.dto.response;

import com.ogjg.back.container.domain.Container;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerResponse {
    private Long containerId;
    private String email;
    private String containerName;
    private String description;
    private String language;
    private String containerUrl;
    private Boolean isPrivate;
    private Long availableStorage;
    private Boolean isPinned;
    private LocalDateTime modifiedAt;
    private LocalDateTime createdAt;

    public ContainerResponse(Container container) {
        this.containerId = container.getContainerId();
        this.email = container.getUser().getEmail();
        this.containerName = container.getName();
        this.description = container.getDescription();
        this.language = container.getLanguage();
        this.containerUrl = container.getContainerUrl();
        this.isPrivate = container.getIsPrivate();
        this.availableStorage = container.getAvailableStorage();
        this.isPinned = container.getIsPinned();
        this.modifiedAt = container.getModifiedAt();
        this.createdAt = container.getCreatedAt();
    }

    @Builder
    public ContainerResponse(Long containerId, String containerName, String email, String description, String language, String containerUrl, Boolean isPrivate, Long availableStorage, Boolean isPinned, LocalDateTime modifiedAt, LocalDateTime createdAt) {
        this.containerId = containerId;
        this.containerName = containerName;
        this.email = email;
        this.description = description;
        this.language = language;
        this.containerUrl = containerUrl;
        this.isPrivate = isPrivate;
        this.availableStorage = availableStorage;
        this.isPinned = isPinned;
        this.modifiedAt = modifiedAt;
        this.createdAt = createdAt;
    }
}
