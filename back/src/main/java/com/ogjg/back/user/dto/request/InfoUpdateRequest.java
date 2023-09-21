package com.ogjg.back.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class InfoUpdateRequest {
    String name;

    @Builder
    public InfoUpdateRequest(String name) {
        this.name = name;
    }
}
