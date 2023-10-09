package com.ogjg.back.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class SignUpRequest {

    @Email(message = "이메일 형식이 잘못됐습니다")
    @NotBlank(message = "이메일을 입력해 주세요")
    private String email;

    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\\d@$!%*?&#.~_-]{8,30}$",
            message = "비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함하고 8자 이상 30자 미만으로 입력 해야 합니다.")
    private String password;

    @NotBlank(message = "이름을 입력해주세요")
    private String name;

    @Builder
    public SignUpRequest(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}