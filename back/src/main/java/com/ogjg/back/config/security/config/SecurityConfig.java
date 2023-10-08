package com.ogjg.back.config.security.config;

import com.ogjg.back.config.security.emailauth.EmailAuthenticationFilter;
import com.ogjg.back.config.security.emailauth.EmailAuthenticationProvider;
import com.ogjg.back.config.security.jwt.JwtUtils;
import com.ogjg.back.config.security.jwt.accesstoken.AccessAuthenticationFilter;
import com.ogjg.back.config.security.jwt.accesstoken.AccessAuthenticationProvider;
import com.ogjg.back.config.security.jwt.refreshtoken.RefreshAuthenticationProvider;
import com.ogjg.back.config.security.jwt.refreshtoken.RefreshTokenAuthenticationFilter;
import com.ogjg.back.user.service.EmailAuthService;
import com.ogjg.back.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final EmailAuthService emailAuthService;
    private final UserService userService;
    private final AuthenticationEntryPoint authenticationEntryPoint;
    private final JwtUtils jwtUtils;

    private final List<String> permitUrlList = new ArrayList<>(
            List.of(
                    "/api/users/email-auth/.*",
                    "/api/users/signup",
                    "/api/users/login",
                    "/api/users/find-password/.*",
                    "/health",
                    "/ws/.*",
                    "/chat/.*"
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
                                .requestMatchers(CorsUtils::isPreFlightRequest)
                                .permitAll()
                                .requestMatchers("/**")
                                .permitAll()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedHeader("*");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "https://ogjg.site"));
        configuration.setAllowCredentials(true);
        configuration.addExposedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public EmailAuthenticationFilter emailAuthenticationFilter() throws Exception {
        return new EmailAuthenticationFilter(new ProviderManager(Collections.singletonList(emailAuthenticationProvider())), emailAuthService, authenticationEntryPoint);
    }

    @Bean
    public AccessAuthenticationFilter accessAuthenticationFilter() throws Exception {
        return new AccessAuthenticationFilter(
                new ProviderManager(Collections.singletonList(accessAuthenticationProvider()))
                , authenticationEntryPoint
                , userService
                , permitUrlList);
    }

    @Bean
    public RefreshTokenAuthenticationFilter refreshTokenAuthenticationFilter() throws Exception {
        return new RefreshTokenAuthenticationFilter(
                new ProviderManager(Collections.singletonList(refreshAuthenticationProvider()))
                , userService
                , authenticationEntryPoint
                , jwtUtils);
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

}