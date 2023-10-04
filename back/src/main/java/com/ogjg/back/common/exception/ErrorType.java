package com.ogjg.back.common.exception;

import org.springframework.http.HttpStatus;

public interface ErrorType {

    HttpStatus getStatusCode();

    String getCode();

    String getMessage();

}
