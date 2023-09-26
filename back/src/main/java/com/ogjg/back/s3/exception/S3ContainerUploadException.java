package com.ogjg.back.s3.exception;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class S3ContainerUploadException extends CustomException {
    public S3ContainerUploadException() {
        super(ErrorCode.S3_FAIL_TO_UPLOAD_CONTAINER);
    }

    public S3ContainerUploadException(String message) {
        super(ErrorCode.S3_FAIL_TO_UPLOAD_CONTAINER, message);
    }

    public S3ContainerUploadException(ErrorData errorData) {
        super(ErrorCode.S3_FAIL_TO_UPLOAD_CONTAINER, errorData);
    }
}
