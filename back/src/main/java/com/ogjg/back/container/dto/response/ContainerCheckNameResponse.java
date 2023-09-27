package com.ogjg.back.container.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerCheckNameResponse {
    boolean isDuplicated;

    @Builder
    public ContainerCheckNameResponse(boolean isDuplicated) {
        this.isDuplicated = isDuplicated;
    }

    public static ContainerCheckNameResponse of(boolean isDuplicated) {
        return ContainerCheckNameResponse.builder()
                .isDuplicated(isDuplicated)
                .build();
    }
}
