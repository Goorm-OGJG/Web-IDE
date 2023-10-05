package com.ogjg.back.container.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerGetDirectoryResponse {
    private String directory;
    private String uuid;

    @Builder
    public ContainerGetDirectoryResponse(String directory, String uuid) {
        this.directory = directory;
        this.uuid = uuid;
    }
}
