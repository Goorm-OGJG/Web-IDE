package com.ogjg.back.user.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class PasswordUpdateRequest {

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,30}$",
            message = "비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함하고 8자 이상 30자 미만으로 입력 해야 합니다.")
    private String currentPassword;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,30}$",
            message = "비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함하고 8자 이상 30자 미만으로 입력 해야 합니다.")
    private String newPassword;

    @Builder
    public PasswordUpdateRequest(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
