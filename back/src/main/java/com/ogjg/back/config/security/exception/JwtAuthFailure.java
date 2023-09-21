package com.ogjg.back.config.security.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class JwtAuthFailure extends CustomException {

    public JwtAuthFailure() {
        super(ErrorCode.AUTH_FAIL);
    }

    public JwtAuthFailure(
            String message
    ) {
        super(ErrorCode.AUTH_FAIL, message);
    }

    public JwtAuthFailure(
            ErrorData errorData
    ) {
        super(ErrorCode.AUTH_FAIL, errorData);
    }

}
