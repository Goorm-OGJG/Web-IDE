package com.ogjg.back.file.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class NotFoundFile extends CustomException {
    public NotFoundFile() {
        super(ErrorCode.S3_NOT_FOUND_FILE);
    }

    public NotFoundFile(String message) {
        super(ErrorCode.S3_NOT_FOUND_FILE, message);
    }

    public NotFoundFile(ErrorData errorData) {
        super(ErrorCode.S3_NOT_FOUND_FILE, errorData);
    }
}
