package com.ogjg.back.file.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class CreateFileRequest {
    private String uuid;

    @Builder
    public CreateFileRequest(String uuid) {
        this.uuid = uuid;
    }
}
