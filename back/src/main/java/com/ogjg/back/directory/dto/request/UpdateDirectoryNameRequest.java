package com.ogjg.back.directory.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class UpdateDirectoryNameRequest {
    private String directoryPath;
    private String newDirectoryName;

    @Builder
    public UpdateDirectoryNameRequest(String directoryPath, String newDirectoryName) {
        this.directoryPath = directoryPath;
        this.newDirectoryName = newDirectoryName;
    }
}
