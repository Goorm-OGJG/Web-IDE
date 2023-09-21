package com.ogjg.back.config.security.jwt;

import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.config.security.exception.JwtAuthFailure;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {

    private final static long ACCESS_TOKEN_VALID_TIME = 5 * 60 * 1000;
    private final static long REFRESH_TOKEN_VALID_TIME = 14 * 24 * 60 * 60 * 1000;
    private final static long EMAIL_TOKEN_VALID_TIME = 3 * 60 * 1000;
    private final static String ISSUER = "team_ogjg_Web_IDE";
    private static Key SIGNATURE_KEY;

    /*
     * 토큰 key 초기화
     * */
    public JwtUtils(
            @Value("${jwt.secret}") String jwtSecret
    ) {
        byte[] byteSecretKey = jwtSecret.getBytes(StandardCharsets.UTF_8);
        SIGNATURE_KEY = new SecretKeySpec(byteSecretKey, SignatureAlgorithm.HS256.getJcaName());
    }

    /*
     * accessToken 생성
     * */
    public String generateAccessToken(
            @Qualifier("jwtUserClaimsDto") JwtTokenClaims userClaimsDto
    ) {
        return Jwts.builder()
                .setHeader(createHeader())
                .setClaims(createClaims(userClaimsDto))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALID_TIME))
                .signWith(SIGNATURE_KEY)
                .compact();
    }

    /*
     * refreshToken 생성
     * */
    public String generateRefreshToken(
            @Qualifier("jwtUserClaimsDto") JwtTokenClaims userClaimsDto
    ) {
        return Jwts.builder()
                .setHeader(createHeader())
                .setClaims(createClaims(userClaimsDto))
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALID_TIME))
                .signWith(SIGNATURE_KEY)
                .compact();
    }

    /*
     * emailAuthToken 생성
     * */
    public String generateEmailAuthToken(
            @Qualifier("jwtEmailAuthClaims") JwtTokenClaims emailAuthClaimsDto
    ) {
        return Jwts.builder()
                .setHeader(createHeader())
                .setClaims(createClaims(emailAuthClaimsDto))
                .setExpiration(new Date(System.currentTimeMillis() + EMAIL_TOKEN_VALID_TIME))
                .signWith(SIGNATURE_KEY)
                .compact();
    }

    /*
     * 토큰 검증
     * */
    public boolean isValidToken(
            String jwt
    ) {

        Claims claims = getClaims(jwt);

        if (!ISSUER.equals(claims.get("iss"))) {
            throw new JwtAuthFailure("Issuer가 일치하지 않습니다.");
        }

        Date expiration = claims.getExpiration();
        if (expiration.before(new Date())) {
            throw new JwtAuthFailure("토큰이 만료되었습니다.");
        }

        return true;
    }

    /*
     * 토큰 파싱, 검증
     * 주어진 token을 파싱하고,
     * 그 결과를 Jws<Claims> 객체로 반환합니다.
     * 이 과정에서 서명도 검증됩니다.
     * 만약 서명이 유효하지 않다면 예외가 발생합니다.
     * */
    public Claims getClaims(
            String token
    ) {
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(SIGNATURE_KEY)
                .build()
                .parseClaimsJws(token);

        return claimsJws.getBody();
    }

    /*
     * 토큰의 헤더
     * */
    private Map<String, Object> createHeader() {
        return new HashMap<>(Map.of(
                "alg", "HS256",
                "typ", "JWT"
        ));
    }

    /*
     * 토큰안에 들어갈 내용
     * */
    private Map<String, Object> createClaims(
            JwtTokenClaims jwtTokenClaims
    ) {
        return new HashMap<>(Map.of(
                "iss", ISSUER,
                "email", jwtTokenClaims.getEmail()
        ));
    }

}
