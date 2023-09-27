package com.ogjg.back.config.security.config;

import com.ogjg.back.config.security.emailauth.EmailAuthenticationFilter;
import com.ogjg.back.config.security.emailauth.EmailAuthenticationProvider;
import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.config.security.jwt.accesstoken.AccessAuthenticationFilter;
import com.ogjg.back.config.security.jwt.accesstoken.AccessAuthenticationProvider;
import com.ogjg.back.config.security.jwt.refreshtoken.RefreshAuthenticationProvider;
import com.ogjg.back.config.security.jwt.refreshtoken.RefreshTokenAuthenticationFilter;
import com.ogjg.back.user.service.EmailAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final EmailAuthService emailAuthService;
    private final JwtUtils jwtUtils;


    private final List<String> permitUrlList = new ArrayList<>(
            List.of(
                    "/api/users/email-auth/.*",
                    "/api/users/signup",
                    "/api/users/login",
                    "/api/users/find-password/.*",
                    "/health"
            ));


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(withDefaults())
                .addFilterBefore(
                        emailAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class
                )
                .addFilterAfter(
                        refreshTokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class
                )
                .addFilterAfter(
                        accessAuthenticationFilter(), RefreshTokenAuthenticationFilter.class
                )
                .authorizeHttpRequests(
                        authorize -> authorize
                                .anyRequest().permitAll())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public EmailAuthenticationFilter emailAuthenticationFilter() throws Exception {
        return new EmailAuthenticationFilter(new ProviderManager(Collections.singletonList(emailAuthenticationProvider())), emailAuthService);
    }

    @Bean
    public AccessAuthenticationFilter accessAuthenticationFilter() throws Exception {
        return new AccessAuthenticationFilter(new ProviderManager(Collections.singletonList(accessAuthenticationProvider())), permitUrlList);
    }

    @Bean
    public RefreshTokenAuthenticationFilter refreshTokenAuthenticationFilter() throws Exception {
        return new RefreshTokenAuthenticationFilter(new ProviderManager(Collections.singletonList(refreshAuthenticationProvider())), jwtUtils);
    }

    @Bean
    public AccessAuthenticationProvider accessAuthenticationProvider() {
        return new AccessAuthenticationProvider(jwtUtils);
    }

    @Bean
    public RefreshAuthenticationProvider refreshAuthenticationProvider() {
        return new RefreshAuthenticationProvider(jwtUtils);
    }

    @Bean
    public EmailAuthenticationProvider emailAuthenticationProvider() {
        return new EmailAuthenticationProvider(jwtUtils);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}