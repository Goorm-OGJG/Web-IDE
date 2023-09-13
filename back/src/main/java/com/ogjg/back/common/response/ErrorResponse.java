package com.ogjg.back.common.response;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.exception.ErrorData;

public class ErrorResponse extends ApiResponse<ErrorData> {

    public ErrorResponse(ErrorCode errorCode) {
        super(errorCode);
    }

    public ErrorResponse(ErrorCode errorCode, ErrorData errorData) {
        super(errorCode, errorData);
    }

}
