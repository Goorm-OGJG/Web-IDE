package com.ogjg.back.file.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class FileAlreadyExists extends CustomException {
    public FileAlreadyExists() {
        super(ErrorCode.S3_FILE_ALREADY_EXISTS);
    }

    public FileAlreadyExists(String message) {
        super(ErrorCode.S3_FILE_ALREADY_EXISTS, message);
    }

    public FileAlreadyExists(ErrorData errorData) {
        super(ErrorCode.S3_FILE_ALREADY_EXISTS, errorData);
    }
}
