package com.ogjg.back.config.security.exception;

import com.ogjg.back.common.exception.ErrorCode;

public class AccessTokenException extends CustomTokenException {

    public AccessTokenException() {
        super(ErrorCode.AUTH_FAIL);
    }

    public AccessTokenException(String message) {
        super(ErrorCode.AUTH_FAIL, message);
    }

}
