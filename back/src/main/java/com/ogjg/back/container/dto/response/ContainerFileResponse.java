package com.ogjg.back.container.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerFileResponse {
    private String filename;
    private String content;

    @Builder
    public ContainerFileResponse(String filename, String content) {
        this.filename = filename;
        this.content = content;
    }
}
