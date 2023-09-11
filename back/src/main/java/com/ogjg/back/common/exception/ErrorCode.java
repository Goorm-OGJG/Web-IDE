package com.ogjg.back.common.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    SUCCESS(HttpStatus.OK,"200","OK"),
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "코드는내맘대로에러","회원를 찾을 수 없습니다");

    @JsonIgnore
    private final HttpStatus statusCode;
    private final String code;
    private String message;

    ErrorCode(HttpStatus statusCode, String code, String message) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
    }

    ErrorCode changeMessage(String message){
        this.message = message;
        return this;
    }
}
