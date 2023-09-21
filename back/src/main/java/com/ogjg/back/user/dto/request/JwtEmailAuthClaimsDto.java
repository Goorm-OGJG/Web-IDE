package com.ogjg.back.user.dto.request;

import com.ogjg.back.config.security.jwt.JwtTokenClaims;
import lombok.*;


@Getter
@NoArgsConstructor
public class JwtEmailAuthClaimsDto extends JwtTokenClaims {

    private String email;

    @Builder
    public JwtEmailAuthClaimsDto(String email) {
        this.email = email;
    }
}
