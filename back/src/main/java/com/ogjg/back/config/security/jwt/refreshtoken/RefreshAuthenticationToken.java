package com.ogjg.back.config.security.jwt.refreshtoken;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class RefreshAuthenticationToken extends AbstractAuthenticationToken {

    private final UserDetails principal;
    private final String refreshToken;

    public RefreshAuthenticationToken(
            String refreshToken
    ) {
        super(null);
        this.principal = null;
        this.refreshToken = refreshToken;
        setAuthenticated(false);
    }

    public RefreshAuthenticationToken(
            Collection<? extends GrantedAuthority> authorities,
            UserDetails userDetails,
            String refreshToken
    ) {
        super(authorities);
        this.principal = userDetails;
        this.refreshToken = refreshToken;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return refreshToken;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
