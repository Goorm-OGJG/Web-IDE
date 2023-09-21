package com.ogjg.back.config.security.jwt;

import com.ogjg.back.config.security.exception.JwtAuthFailure;
import com.ogjg.back.user.dto.request.JwtUserClaimsDto;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.Collections;

@RequiredArgsConstructor
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final JwtUtils jwtUtils;

    @Override
    public Authentication authenticate(
            Authentication authentication
    ) throws AuthenticationException {
        String jwt = String.valueOf(authentication.getCredentials());

        if (!jwtUtils.isValidToken(jwt)) {
            throw new JwtAuthFailure();
        }
        JwtUserDetails jwtUserDetails = getJwtUserDetails(jwt);

        return new JwtAuthenticationToken(jwtUserDetails, jwt, Collections.emptyList());
    }

    private JwtUserDetails getJwtUserDetails(String jwt) {
        Claims claims = jwtUtils.getClaims(jwt);

        JwtUserClaimsDto userClaimsDto = JwtUserClaimsDto.builder()
                .email((String) claims.get("email"))
                .build();

        return new JwtUserDetails(userClaimsDto);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(JwtAuthenticationToken.class);
    }
}
