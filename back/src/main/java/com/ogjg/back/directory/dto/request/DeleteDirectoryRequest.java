package com.ogjg.back.directory.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class DeleteDirectoryRequest {
    private String directoryPath;

    @Builder
    public DeleteDirectoryRequest(String directoryPath) {
        this.directoryPath = directoryPath;
    }
}
