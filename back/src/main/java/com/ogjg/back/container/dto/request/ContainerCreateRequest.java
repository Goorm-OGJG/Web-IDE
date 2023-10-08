package com.ogjg.back.container.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ogjg.back.container.domain.Container;
import com.ogjg.back.user.domain.User;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerCreateRequest {

    @Pattern(regexp = "^[a-zA-Z0-9\\-_]{1,20}$",
            message = "컨테이너 이름에는 영문, 숫자가 포함가능하며, 특수문자는 '-', '_'만 포함될 수 있습니다.")
    private String name;
    private String description;
    @JsonProperty("private")
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
