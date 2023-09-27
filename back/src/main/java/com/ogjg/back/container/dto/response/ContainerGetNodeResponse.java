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
public class ContainerGetNodeResponse {
    public static final String DELIMITER = "/";
    private String key;
    private String title;
    private List<ContainerGetNodeResponse> children;

    public ContainerGetNodeResponse(String key, String title) {
        this.key = key;
        this.title = title;
        this.children = new ArrayList<>();
    }

    public ContainerGetNodeResponse findOrCreateChild(String fullKey, String title) {
        for (ContainerGetNodeResponse child : children) {
            if (child.title.equals(title)) {
                return child;
            }
        }
        ContainerGetNodeResponse newNode = new ContainerGetNodeResponse(fullKey, title);
        children.add(newNode);
        return newNode;
    }

    public static ContainerGetNodeResponse buildTreeFromKeys(List<String> s3Keys) {
        ContainerGetNodeResponse root = new ContainerGetNodeResponse("", "root");

        for (String fullKey : s3Keys) {
            String[] parts = fullKey.split(DELIMITER);
            ContainerGetNodeResponse currentNode = root;

            // email, continerId 부분을 제외하고 파싱하기 위해 2부터 시작
            for (int i = 2; i < parts.length; i++) {
                String part = parts[i];
                if (part.isEmpty()) continue;

                String accumulatedKey = DELIMITER + String.join(DELIMITER, java.util.Arrays.copyOfRange(parts, 2, i + 1)) + DELIMITER;

                currentNode = currentNode.findOrCreateChild(accumulatedKey, part);
            }
        }

        return root.children.get(0);
    }
}



