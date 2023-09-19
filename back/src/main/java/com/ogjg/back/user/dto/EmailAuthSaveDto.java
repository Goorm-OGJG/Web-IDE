package com.ogjg.back.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class EmailAuthSaveDto {

    private String client_id;
    private String email;

    public EmailAuthSaveDto(String email, String client_id) {
        this.client_id = client_id;
        this.email = email;
    }
}
