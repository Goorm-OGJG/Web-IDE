package com.ogjg.back.directory.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class CreateDirectoryRequest {
    private String uuid;

    @Builder
    public CreateDirectoryRequest(String uuid) {
        this.uuid = uuid;
    }
}
