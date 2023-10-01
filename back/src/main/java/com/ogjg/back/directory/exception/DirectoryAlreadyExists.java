package com.ogjg.back.directory.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class DirectoryAlreadyExists extends CustomException {
    public DirectoryAlreadyExists() {
        super(ErrorCode.S3_DIRECTORY_ALREADY_EXISTS);
    }

    public DirectoryAlreadyExists(String message) {
        super(ErrorCode.S3_DIRECTORY_ALREADY_EXISTS, message);
    }

    public DirectoryAlreadyExists(ErrorData errorData) {
        super(ErrorCode.S3_DIRECTORY_ALREADY_EXISTS, errorData);
    }
}
