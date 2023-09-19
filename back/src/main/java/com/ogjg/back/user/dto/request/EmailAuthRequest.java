package com.ogjg.back.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class EmailAuthRequest {

    @Email(message = "이메일 형식이 잘못되었습니다")
    @NotBlank(message = "이메일을 입력해 주세요")
    private String email;

    public EmailAuthRequest(String email) {
        this.email = email;
    }
}
