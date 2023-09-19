package com.ogjg.back.user.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class NotFoundUser extends CustomException {
    public NotFoundUser(ErrorCode errorCode) {
        super(errorCode);
    }

    public NotFoundUser(ErrorCode errorCode, ErrorData errorData) {
        super(errorCode, errorData);
    }
}
