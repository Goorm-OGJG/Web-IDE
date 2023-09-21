package com.ogjg.back.config.security.config;

import com.ogjg.back.config.security.emailauth.EmailAuthenticationFilter;
import com.ogjg.back.config.security.emailauth.EmailAuthenticationProvider;
import com.ogjg.back.config.security.jwt.JwtAuthenticationFilter;
import com.ogjg.back.config.security.jwt.JwtAuthenticationProvider;
import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.user.service.EmailAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
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
            List.of("/api/user/email-auth/.*",
                    "/signup"
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
                .authorizeHttpRequests(
                        authorize -> authorize
                                .anyRequest().permitAll())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    @Primary
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationManager emailAuthenticationManager() throws Exception {
        return new ProviderManager(Collections.singletonList(emailAuthenticationProvider()));
    }

    @Bean
    public AuthenticationManager jwtAuthenticationManager() throws Exception {
        return new ProviderManager(Collections.singletonList(jwtAuthenticationProvider()));
    }

    @Bean
    public EmailAuthenticationFilter emailAuthenticationFilter() throws Exception {
        return new EmailAuthenticationFilter(emailAuthenticationManager(), emailAuthService);
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception {
        return new JwtAuthenticationFilter(jwtAuthenticationManager(), permitUrlList);
    }

    @Bean
    public JwtAuthenticationProvider jwtAuthenticationProvider() {
        return new JwtAuthenticationProvider(jwtUtils);
    }

    @Bean
    public EmailAuthenticationProvider emailAuthenticationProvider() {
        return new EmailAuthenticationProvider(jwtUtils);
    }

}