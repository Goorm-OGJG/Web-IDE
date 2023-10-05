package com.ogjg.back.user.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class UnauthorizedUserAccessException extends CustomException {

    public UnauthorizedUserAccessException() {
        super(ErrorCode.UNAUTHORIZED_USER_ACCESS);
    }

    public UnauthorizedUserAccessException(String message) {
        super(ErrorCode.UNAUTHORIZED_USER_ACCESS, message);
    }

    public UnauthorizedUserAccessException(ErrorData errorData) {
        super(ErrorCode.UNAUTHORIZED_USER_ACCESS, errorData);
    }
}
