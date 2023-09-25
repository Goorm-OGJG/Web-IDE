package com.ogjg.back.s3.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class S3ImageUploadException extends CustomException {
    public S3ImageUploadException() {
        super(ErrorCode.S3_FAIL_TO_UPLOAD_IMAGE);
    }

    public S3ImageUploadException(String message) {
        super(ErrorCode.S3_FAIL_TO_UPLOAD_IMAGE, message);
    }

    public S3ImageUploadException(ErrorData errorData) {
        super(ErrorCode.S3_FAIL_TO_UPLOAD_IMAGE, errorData);
    }
}
