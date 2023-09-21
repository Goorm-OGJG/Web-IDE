package com.ogjg.back.config.security.jwt;

import com.ogjg.back.user.dto.request.JwtUserClaimsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@RequiredArgsConstructor
public class JwtUserDetails implements UserDetails {

    private final JwtUserClaimsDto jwtUserClaimsDto;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public String getEmail() {
        return jwtUserClaimsDto.getEmail();
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    //계정의 만료여부
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //계정이 잠겨있는지 확인
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //인증 자격 만료 여부 확인
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //계정의 활성화 여부
    @Override
    public boolean isEnabled() {
        return true;
    }
}
