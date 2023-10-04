package com.ogjg.back.file.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class UpdateFileRequest {
    private String content;

    @Builder
    public UpdateFileRequest(String content) {
        this.content = content;
    }
}
