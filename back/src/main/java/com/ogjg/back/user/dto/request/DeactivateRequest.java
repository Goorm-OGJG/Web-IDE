package com.ogjg.back.user.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class DeactivateRequest {
    private String password;

    @Builder
    public DeactivateRequest(String password) {
        this.password = password;
    }
}
