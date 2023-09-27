package com.ogjg.back.container.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerGetResponse {

    private String language;
    private ContainerGetNodeResponse treeData;
    private List<ContainerGetFileResponse> fileData;
    private List<String> directories;

    @Builder
    public ContainerGetResponse(
            String language,
            ContainerGetNodeResponse treeData,
            List<ContainerGetFileResponse> fileData,
            List<String> directories
    ) {
        this.language = language;
        this.treeData = treeData;
        this.fileData = fileData;
        this.directories = directories;
    }
}
