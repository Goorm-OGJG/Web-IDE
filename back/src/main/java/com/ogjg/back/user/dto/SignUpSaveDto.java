package com.ogjg.back.user.dto;

import com.ogjg.back.user.domain.EmailAuth;
import com.ogjg.back.user.dto.request.SignUpRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class SignUpSaveDto {

    private EmailAuth emailAuth;

    private String email;

    private String password;

    private String name;

    public SignUpSaveDto(SignUpRequest signUpRequest, EmailAuth emailAuth, String EncryptionPassword) {
        this.emailAuth = emailAuth;
        this.email = signUpRequest.getEmail();
        this.password = EncryptionPassword;
        this.name = signUpRequest.getName();
    }
}
