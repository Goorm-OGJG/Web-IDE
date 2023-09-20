package com.ogjg.back.container.dto.request;

import com.ogjg.back.container.domain.Container;
import com.ogjg.back.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerCreateRequest {
    private String name;
    private String description;
    private boolean isPrivate;
    private String language;

    @Builder
    public ContainerCreateRequest(String name, String description, boolean isPrivate, String language) {
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.language = language;
    }

    // todo : 임시 url 제거
    public Container toContainer(User user) {
        return Container.builder()
                .user(user)
                .name(name)
                .description(description)
                .language(language)
                .containerUrl("aws temp url.com")
                .isPrivate(isPrivate)
                .availableStorage(10L)
                .isPinned(false)
                .modifiedAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
