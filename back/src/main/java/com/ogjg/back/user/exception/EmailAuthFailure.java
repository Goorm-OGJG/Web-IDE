package com.ogjg.back.user.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class EmailAuthFailure extends CustomException {

    public EmailAuthFailure() {
        super(ErrorCode.EMAIL_AUTH_FAIL);
    }

    public EmailAuthFailure(
            String message
    ) {
        super(ErrorCode.EMAIL_AUTH_FAIL, message);
    }

    public EmailAuthFailure(
            ErrorData errorData
    ) {
        super(ErrorCode.EMAIL_AUTH_FAIL, errorData);
    }
}
