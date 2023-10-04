package com.ogjg.back.container.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerGetFileResponse {
    private String filePath;
    private String content;
    private String uuid;

    @Builder
    public ContainerGetFileResponse(String filePath, String content, String uuid) {
        this.filePath = filePath;
        this.content = content;
        this.uuid = uuid;
    }
}
