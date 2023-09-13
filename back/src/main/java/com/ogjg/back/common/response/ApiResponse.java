package com.ogjg.back.common.response;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.dto.Status;
import lombok.Getter;

@Getter
public class ApiResponse<T> {

    private Status status;

    private T data;

    public ApiResponse(ErrorCode errorCode) {
        this.status = new Status(errorCode);
    }

    public ApiResponse(ErrorCode errorCode, T data) {
        this.status = new Status(errorCode);
        this.data = data;
    }
}
