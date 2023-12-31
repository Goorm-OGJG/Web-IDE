package com.ogjg.back.common.controller;

import com.ogjg.back.common.exception.CustomException;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.common.response.ErrorResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(CustomException.class)
    @ResponseBody
    public ApiResponse<?> customExceptionHandler(
            HttpServletResponse response, CustomException e
    ) {
        response.setStatus(e.getErrorCode().getStatusCode().value());
        return new ErrorResponse(e.getErrorCode(), e.getErrorData());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ApiResponse<?> validationHandler(
            HttpServletResponse response, MethodArgumentNotValidException e
    ) {
        response.setStatus(ErrorCode.INVALID_FORMAT.getStatusCode().value());
        String errorMessage = validationErrorMessage(e.getBindingResult().getFieldError());
        return new ErrorResponse(ErrorCode.INVALID_FORMAT.changeMessage(errorMessage));
    }

    private String validationErrorMessage(FieldError fieldError) {
        if (fieldError != null) {
            return fieldError.getDefaultMessage();
        }
        return ErrorCode.INVALID_FORMAT.getMessage();
    }
}
