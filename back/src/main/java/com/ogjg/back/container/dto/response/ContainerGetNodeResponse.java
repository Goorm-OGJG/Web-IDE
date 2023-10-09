package com.ogjg.back.container.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static com.ogjg.back.common.util.PathUtil.isFile;
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

    /**
     * 컨테이너 모든 구조 가져오기 -> treeData 생성
     * 이메일 경로를 제외한 구조를 응답값에 포함해야 하므로 절삭된 키 사용
     */
    public static ContainerGetNodeResponse buildTreeFromKeys(List<String> s3Keys) {
        ContainerGetNodeResponse root = new ContainerGetNodeResponse("", "root");

        for (String fullKey : s3Keys) {
            String[] parts = fullKey.split(DELIMITER);
            ContainerGetNodeResponse currentNode = root;

            // 빈 부분을 제외하고 파싱하기 위해 1부터 시작
            for (int i = 1; i < parts.length; i++) {
                String part = parts[i];
                if (part.isEmpty()) continue;

                String accumulatedKey = DELIMITER + String.join(DELIMITER, java.util.Arrays.copyOfRange(parts, 1, i + 1));
                if (!isFile(accumulatedKey)) accumulatedKey += DELIMITER;

                currentNode = currentNode.findOrCreateChild(accumulatedKey, part);
            }
        }

        return root.children.get(0);
    }
}



