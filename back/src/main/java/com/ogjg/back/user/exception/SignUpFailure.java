package com.ogjg.back.user.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class SignUpFailure extends CustomException {
    public SignUpFailure() {
        super(ErrorCode.FAIL_SIGNUP);
    }

    public SignUpFailure(String message) {
        super(ErrorCode.FAIL_SIGNUP, message);
    }

    public SignUpFailure(ErrorData errorData) {
        super(ErrorCode.FAIL_SIGNUP, errorData);
    }
}
