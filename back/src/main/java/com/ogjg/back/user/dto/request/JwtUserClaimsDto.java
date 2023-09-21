package com.ogjg.back.user.dto.request;

import com.ogjg.back.config.security.jwt.JwtTokenClaims;
import lombok.*;

@Getter
@NoArgsConstructor
public class JwtUserClaimsDto extends JwtTokenClaims {

    private String email;

    @Builder
    public JwtUserClaimsDto(String email) {
        this.email = email;
    }
}

