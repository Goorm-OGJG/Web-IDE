package com.ogjg.back.directory.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class NotFoundDirectory extends CustomException {
    public NotFoundDirectory() {
        super(ErrorCode.S3_NOT_FOUND_DIRECTORY);
    }

    public NotFoundDirectory(String message) {
        super(ErrorCode.S3_NOT_FOUND_DIRECTORY, message);
    }

    public NotFoundDirectory(ErrorData errorData) {
        super(ErrorCode.S3_NOT_FOUND_DIRECTORY, errorData);
    }
}
