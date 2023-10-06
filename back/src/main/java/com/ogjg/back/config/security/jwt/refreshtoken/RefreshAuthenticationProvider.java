package com.ogjg.back.config.security.jwt.refreshtoken;

import com.ogjg.back.config.security.exception.RefreshTokenException;
import com.ogjg.back.config.security.jwt.JwtUserDetails;
import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.user.dto.request.JwtUserClaimsDto;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

@RequiredArgsConstructor
public class RefreshAuthenticationProvider implements AuthenticationProvider {

    private final JwtUtils jwtUtils;

    @Override
    public Authentication authenticate(
            Authentication authentication
    ) throws AuthenticationException {

        String refreshToken = (String) authentication.getCredentials();

        if (jwtUtils.isValidToken(refreshToken)) {
            throw new RefreshTokenException();
        }

        Claims claims = jwtUtils.getClaims(refreshToken);

        JwtUserDetails jwtUserDetails =
                new JwtUserDetails(new JwtUserClaimsDto(String.valueOf(claims.get("email"))));

        return new RefreshAuthenticationToken(null, jwtUserDetails, refreshToken);
    }

    @Override
    public boolean supports(
            Class<?> authentication
    ) {
        return authentication.equals(RefreshAuthenticationToken.class);
    }
}
