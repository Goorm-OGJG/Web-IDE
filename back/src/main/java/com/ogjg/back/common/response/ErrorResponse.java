package com.ogjg.back.common.response;

import com.ogjg.back.common.exception.ErrorData;
import com.ogjg.back.common.exception.ErrorType;

public class ErrorResponse extends ApiResponse<ErrorData> {

    public ErrorResponse(ErrorType errorCode) {
        super(errorCode);
    }

    public ErrorResponse(ErrorType errorCode, ErrorData errorData) {
        super(errorCode, errorData);
    }

}
