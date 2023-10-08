package com.ogjg.back.config.security.exception;

import com.ogjg.back.common.exception.ErrorCode;

public class RefreshTokenException extends CustomTokenException {

    public RefreshTokenException() {
        super(ErrorCode.AUTH_FAIL);
    }

    public RefreshTokenException(String message) {
        super(ErrorCode.AUTH_FAIL, message);
    }

}
