package com.ogjg.back.file.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class UpdateFileRequest {
    private String filePath;
    private String content;

    @Builder
    public UpdateFileRequest(String filePath, String content) {
        this.filePath = filePath;
        this.content = content;
    }

}
