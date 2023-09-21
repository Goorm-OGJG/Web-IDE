package com.ogjg.back.config.security.jwt;

import lombok.Setter;

@Setter
public abstract class JwtTokenClaims {

    private String email;

    public abstract String getEmail();

}
