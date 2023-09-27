package com.ogjg.back.container.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@JsonSerialize(using = ContainerNodeResponseSerializer.class)
public class ContainerNodeResponse {
    public static final String DELIMITER_SLASH = "/";
    private String key;
    private String title;
    private List<ContainerNodeResponse> children;

    public ContainerNodeResponse(String key, String title) {
        this.key = key;
        this.title = title;
        this.children = new ArrayList<>();
    }

    public ContainerNodeResponse findOrCreateChild(String fullKey, String title) {
        for (ContainerNodeResponse child : children) {
            if (child.title.equals(title)) {
                return child;
            }
        }
        ContainerNodeResponse newNode = new ContainerNodeResponse(fullKey, title);
        children.add(newNode);
        return newNode;
    }

    public static ContainerNodeResponse buildTreeFromS3Keys(List<String> s3Keys) {
        ContainerNodeResponse root = new ContainerNodeResponse("", "Root");

        for (String fullKey : s3Keys) {
            String[] parts = fullKey.split(DELIMITER_SLASH);
            ContainerNodeResponse currentNode = root;

            for (int i = 0; i < parts.length; i++) {
                String part = parts[i];
                if (part.isEmpty()) continue;

                String accumulatedKey = String.join(DELIMITER_SLASH, java.util.Arrays.copyOfRange(parts, 0, i + 1)) + DELIMITER_SLASH;

                currentNode = currentNode.findOrCreateChild(accumulatedKey, part);
            }
        }

        return root;
    }
}



