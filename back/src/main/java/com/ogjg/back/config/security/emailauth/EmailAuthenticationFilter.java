package com.ogjg.back.config.security.emailauth;

import com.ogjg.back.user.service.EmailAuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class EmailAuthenticationFilter extends OncePerRequestFilter {


    private final AuthenticationManager authenticationManager;
    private final EmailAuthService emailAuthService;

    public EmailAuthenticationFilter(
            @Qualifier("emailAuthenticationManager") AuthenticationManager authenticationManager,
            EmailAuthService emailAuthService
    ) {
        this.authenticationManager = authenticationManager;
        this.emailAuthService = emailAuthService;
    }

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

        if (!uri.startsWith("/api/user/email-auth/success/")) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication authenticate = null;
        try {

            String token = uri.substring("/api/user/email-auth/success/".length());
            EmailAuthenticationToken emailAuthenticationToken = new EmailAuthenticationToken(token);

            authenticate = authenticationManager.authenticate(emailAuthenticationToken);

        } catch (Exception e) {
            log.error("이메일 인증도중 에러발생 = {}", e.getMessage());
        }

        EmailAuthUserDetails principal = (EmailAuthUserDetails) authenticate.getPrincipal();

        emailAuthService.successEmailAuth(principal);

        String emailSuccessTemplate = emailAuthService.emailAuthTemplate("email_auth_success.html");
        response.setContentType("text/html; charset=UTF-8");
        response.getWriter().write(emailSuccessTemplate);
    }
}


