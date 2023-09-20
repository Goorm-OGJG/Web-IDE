package com.ogjg.back.container.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ContainerNameCheckResponse {
    boolean isDuplicated;

    @Builder
    public ContainerNameCheckResponse(boolean isDuplicated) {
        this.isDuplicated = isDuplicated;
    }

    public static ContainerNameCheckResponse of(boolean isDuplicated) {
        return ContainerNameCheckResponse.builder()
                .isDuplicated(isDuplicated)
                .build();
    }
}
