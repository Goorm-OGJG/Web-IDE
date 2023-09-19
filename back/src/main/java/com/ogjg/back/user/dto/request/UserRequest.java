package com.ogjg.back.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    @Email(message = "이메일 형식이 잘못됐습니다")
    private String email;

    //  영문숫자특수문자반드시포함해서 8~30자 사이
    @Min(8)
    @Max(30)
    @NotBlank(message = "비밀번호를 확인해주세요")
    private String password;

    @NotBlank(message = "이름을 입력해주세요")
    private String name;

    @Builder
    public UserRequest(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}