package com.ogjg.back.config.security.jwt.accesstoken;

import com.ogjg.back.config.security.exception.JwtAuthFailure;
import com.ogjg.back.config.security.jwt.JwtUserDetails;
import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.user.dto.request.JwtUserClaimsDto;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.Collections;

@RequiredArgsConstructor
public class AccessAuthenticationProvider implements AuthenticationProvider {

    private final JwtUtils jwtUtils;

    @Override
    public Authentication authenticate(
            Authentication authentication
    ) throws AuthenticationException {
        String accessToken = String.valueOf(authentication.getCredentials());

        if (!jwtUtils.isValidToken(accessToken)) {
            throw new JwtAuthFailure("AccessToken 인증 실패");
        }
        JwtUserDetails jwtUserDetails = getJwtUserDetails(accessToken);

        return new AccessAuthenticationToken(jwtUserDetails, accessToken, Collections.emptyList());
    }

    private JwtUserDetails getJwtUserDetails(String accessToken) {
        Claims claims = jwtUtils.getClaims(accessToken);

        JwtUserClaimsDto userClaimsDto = JwtUserClaimsDto.builder()
                .email((String) claims.get("email"))
                .build();

        return new JwtUserDetails(userClaimsDto);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(AccessAuthenticationToken.class);
    }
}
