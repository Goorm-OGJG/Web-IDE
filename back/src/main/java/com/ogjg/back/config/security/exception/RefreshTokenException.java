package com.ogjg.back.config.security.exception;

import com.ogjg.back.common.exception.ErrorCode;

public class RefreshTokenException extends CustomTokenException {

    public RefreshTokenException() {
        super(ErrorCode.AUTH_FAIL.changeMessage("RefreshToken 인증 오류"));
    }

}
