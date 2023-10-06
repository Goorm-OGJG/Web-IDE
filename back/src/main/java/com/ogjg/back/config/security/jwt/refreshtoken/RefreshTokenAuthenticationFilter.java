package com.ogjg.back.config.security.jwt.refreshtoken;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import com.ogjg.back.config.security.exception.RefreshTokenException;
import com.ogjg.back.config.security.jwt.JwtUserDetails;
import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.user.dto.request.JwtUserClaimsDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@RequiredArgsConstructor
public class RefreshTokenAuthenticationFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;
    private final AuthenticationEntryPoint authenticationEntryPoint;
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String uri = request.getRequestURI();

        if (!uri.startsWith("/api/users/token")) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication authenticate = null;

        try {
            String refreshToken = getRefreshToken(request);

            RefreshAuthenticationToken refreshAuthenticationToken = new RefreshAuthenticationToken(refreshToken);
            authenticate = authenticationManager.authenticate(refreshAuthenticationToken);

        } catch (Exception e) {
//            todo 구조적 개선필요
            authenticationEntryPoint.commence(request, response, new RefreshTokenException());
            return;
        }

        JwtUserDetails user = (JwtUserDetails) authenticate.getPrincipal();
        JwtUserClaimsDto jwtUserClaimsDto = new JwtUserClaimsDto(user.getEmail());

        String accessToken = jwtUtils.generateAccessToken(jwtUserClaimsDto);

        response.addHeader("Authorization", "Bearer " + accessToken);

        ObjectMapper objectMapper = new ObjectMapper();

        ApiResponse<?> apiResponse = new ApiResponse<>(ErrorCode.SUCCESS);
        String successResponse = objectMapper.writeValueAsString(apiResponse);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(successResponse);
        response.getWriter().flush();
    }

    private String getRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        return Arrays.stream(cookies)
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst()
                .orElseThrow(RefreshTokenException::new)
                .getValue();
    }
}