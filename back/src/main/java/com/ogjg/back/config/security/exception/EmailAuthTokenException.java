package com.ogjg.back.config.security.exception;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;
import com.ogjg.back.common.exception.ErrorType;

public class EmailAuthTokenException extends CustomTokenException {

    public EmailAuthTokenException() {
        super(ErrorCode.AUTH_FAIL.changeMessage("이메일 인증 토큰 인증 실패"));
    }

    public EmailAuthTokenException(ErrorType errorType, ErrorData errorData) {
        super(errorType, errorData);
    }
}