package com.ogjg.back.common.response.dto;


import com.ogjg.back.common.exception.ErrorType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Status {
    private String code;
    private String message;

    public Status(ErrorType errorCode) {
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
    }
}
