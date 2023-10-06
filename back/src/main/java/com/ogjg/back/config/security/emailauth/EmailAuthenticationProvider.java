package com.ogjg.back.config.security.emailauth;

import com.ogjg.back.config.security.exception.EmailAuthTokenException;
import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.user.dto.request.JwtEmailAuthClaimsDto;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.Collections;

@RequiredArgsConstructor
public class EmailAuthenticationProvider implements AuthenticationProvider {

    private final JwtUtils jwtUtils;

    @Override
    public Authentication authenticate(
            Authentication authentication
    ) throws AuthenticationException {
        String jwt = String.valueOf(authentication.getCredentials());

        if (!jwtUtils.isValidToken(jwt)) {
            throw new EmailAuthTokenException();
        }

        EmailAuthUserDetails emailAuthUserDetails = emailAuthUserDetails(jwt);

        return new EmailAuthenticationToken(emailAuthUserDetails, jwt, Collections.emptyList());
    }

    private EmailAuthUserDetails emailAuthUserDetails(String jwt) {
        Claims claims = jwtUtils.getClaims(jwt);

        JwtEmailAuthClaimsDto emailAuthClaimsDto = JwtEmailAuthClaimsDto.builder()
                .email(String.valueOf(claims.get("email")))
                .build();

        return new EmailAuthUserDetails(emailAuthClaimsDto);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(EmailAuthenticationToken.class);
    }
}
