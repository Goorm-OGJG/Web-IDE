package com.ogjg.back.config.security.emailauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.config.security.exception.EmailAuthFailure;
import com.ogjg.back.user.service.EmailAuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class EmailAuthenticationFilter extends OncePerRequestFilter {


    private final AuthenticationManager authenticationManager;
    private final EmailAuthService emailAuthService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String uri = request.getRequestURI();

        if (uri.startsWith("/favicon")) {
//            todo favicon 어떻게 처리할지 고민해보기
            return;
        }

        if (!uri.startsWith("/api/users/email-auth/success/")) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication authenticate = null;
        try {

            String token = uri.substring("/api/users/email-auth/success/".length());
            EmailAuthenticationToken emailAuthenticationToken = new EmailAuthenticationToken(token);

            authenticate = authenticationManager.authenticate(emailAuthenticationToken);

        } catch (Exception e) {
            log.error("이메일 인증도중 에러발생 = {}", e.getMessage());
//todo 구조적 개선필요
            response.setStatus(ErrorCode.EMAIL_AUTH_FAIL.getStatusCode().value());
            ApiResponse<?> jsonResponse = new ApiResponse<>(ErrorCode.EMAIL_AUTH_FAIL.changeMessage("이메일 인증 실패"));
            ObjectMapper objectMapper = new ObjectMapper();
            String errorResponse = objectMapper.writeValueAsString(jsonResponse);
            response.setCharacterEncoding("utf-8");
            response.getWriter().write(errorResponse);
            throw new EmailAuthFailure("이메일 인증 실패");
        }

        EmailAuthUserDetails principal = (EmailAuthUserDetails) authenticate.getPrincipal();

        emailAuthService.successEmailAuth(principal);

        String emailSuccessTemplate = emailAuthService.emailAuthTemplate("email_auth_success.html");
        response.setContentType("text/html; charset=UTF-8");
        response.getWriter().write(emailSuccessTemplate);
    }
}


