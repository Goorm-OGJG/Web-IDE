package com.ogjg.back.user.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class LoginFailure extends CustomException {
    public LoginFailure() {
        super(ErrorCode.LOGIN_FAIL);
    }

    public LoginFailure(String message) {
        super(ErrorCode.LOGIN_FAIL, message);
    }

    public LoginFailure(ErrorData errorData) {
        super(ErrorCode.LOGIN_FAIL, errorData);
    }
}
