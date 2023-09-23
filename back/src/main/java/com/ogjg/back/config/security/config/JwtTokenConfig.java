package com.ogjg.back.config.security.config;

import com.ogjg.back.config.security.jwt.JwtTokenClaims;
import com.ogjg.back.user.dto.request.JwtEmailAuthClaimsDto;
import com.ogjg.back.user.dto.request.JwtUserClaimsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
@RequiredArgsConstructor
public class JwtTokenConfig {


    @Bean
    @RequestScope
    public JwtTokenClaims jwtUserClaimsDto() {
        return new JwtUserClaimsDto();
    }

    @Bean
    @RequestScope
    public JwtTokenClaims jwtEmailAuthClaims() {
        return new JwtEmailAuthClaimsDto();
    }

    @Bean
    public Map<String, SseEmitter> clients() {
        return new ConcurrentHashMap<>();
    }

}
