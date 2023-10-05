package com.ogjg.back.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
class ErrorResult implements ErrorType {

    private final HttpStatus statusCode;
    private final String code;
    private final String message;

    public ErrorResult(HttpStatus statusCode, String code, String message) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
    }
}
