package com.ogjg.back.config.security.exception.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.config.security.exception.CustomTokenException;
import com.ogjg.back.config.security.exception.JwtAuthFailure;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException, ServletException {

        CustomTokenException tokenException = (CustomTokenException) authException;

        response.setStatus(tokenException.getErrorType().getStatusCode().value());

        ApiResponse<?> jsonResponse = new ApiResponse<>(tokenException.getErrorType());

        String errorResponse = objectMapper.writeValueAsString(jsonResponse);

        response.setContentType("application/json; charset=utf-8");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(errorResponse);

        log.error("에러메시지 =", new JwtAuthFailure(tokenException.getErrorType().getMessage()));
    }
}
