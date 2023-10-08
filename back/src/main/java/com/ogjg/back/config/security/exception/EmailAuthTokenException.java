package com.ogjg.back.config.security.exception;

import com.ogjg.back.common.exception.ErrorCode;

public class EmailAuthTokenException extends CustomTokenException {

    public EmailAuthTokenException() {
        super(ErrorCode.AUTH_FAIL);
    }

    public EmailAuthTokenException(String message) {
        super(ErrorCode.AUTH_FAIL, message);
    }

}