package com.ogjg.back.container.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class DuplicatedContainerName extends CustomException {
    public DuplicatedContainerName() {
        super(ErrorCode.DUPLICATED_CONTAINER_NAME);
    }

    public DuplicatedContainerName(String message) {
        super(ErrorCode.DUPLICATED_CONTAINER_NAME, message);
    }

    public DuplicatedContainerName(ErrorData errorData) {
        super(ErrorCode.DUPLICATED_CONTAINER_NAME, errorData);
    }
}
