package com.ogjg.back.container.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class NotFoundContainer extends CustomException {
    public NotFoundContainer() {
        super(ErrorCode.NOT_FOUND_CONTAINER);
    }

    public NotFoundContainer(String message) {
        super(ErrorCode.NOT_FOUND_CONTAINER, message);
    }

    public NotFoundContainer(ErrorData errorData) {
        super(ErrorCode.NOT_FOUND_CONTAINER, errorData);
    }
}
