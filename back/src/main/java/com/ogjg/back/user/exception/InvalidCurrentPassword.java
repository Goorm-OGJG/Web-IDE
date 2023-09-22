package com.ogjg.back.user.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class InvalidCurrentPassword extends CustomException {
    public InvalidCurrentPassword() {
        super(ErrorCode.INVALID_CURRENT_PASSWORD);
    }

    public InvalidCurrentPassword(String message) {
        super(ErrorCode.INVALID_CURRENT_PASSWORD, message);
    }

    public InvalidCurrentPassword(ErrorData errorData) {
        super(ErrorCode.INVALID_CURRENT_PASSWORD, errorData);
    }
}
