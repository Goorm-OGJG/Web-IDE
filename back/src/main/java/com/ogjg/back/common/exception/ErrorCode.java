package com.ogjg.back.common.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    SUCCESS(HttpStatus.OK, "200", "OK"),
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "404", "회원를 찾을 수 없습니다"),
    INVALID_FORMAT(HttpStatus.BAD_REQUEST, "400", "데이터 검증 실패"),
    AUTH_FAIL(HttpStatus.UNAUTHORIZED, "401", "인증에 실패 했습니다"),
    EMAIL_AUTH_FAIL(HttpStatus.UNAUTHORIZED, "401", "이메일 인증에 실패 했습니다");

    @JsonIgnore
    private final HttpStatus statusCode;
    private final String code;
    private String message;

    ErrorCode(
            HttpStatus statusCode,
            String code,
            String message
    ) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
    }

    public ErrorCode changeMessage(
            String message
    ) {
        this.message = message;
        return this;
    }

}
