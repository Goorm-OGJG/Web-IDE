package com.ogjg.back.file.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class UpdateFilenameRequest {
    private String filePath;
    private String newFilename;

    @Builder
    public UpdateFilenameRequest(String filePath, String newFilename) {
        this.filePath = filePath;
        this.newFilename = newFilename;
    }
}
