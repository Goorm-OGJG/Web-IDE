package com.ogjg.back.config.security.jwt.accesstoken;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class AccessAuthenticationToken extends AbstractAuthenticationToken {

    private final UserDetails principal;
    private String accessToken;

    public AccessAuthenticationToken(
            String accessToken) {
        super(null);
        this.principal = null;
        this.accessToken = accessToken;
        setAuthenticated(false);
    }

    public AccessAuthenticationToken(
            UserDetails principal,
            String accessToken,
            Collection<? extends GrantedAuthority> authorities
    ) {
        super(authorities);
        this.principal = principal;
        this.accessToken = accessToken;
        super.setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return accessToken;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
