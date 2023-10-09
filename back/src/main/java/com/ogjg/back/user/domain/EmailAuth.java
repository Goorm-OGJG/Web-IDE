package com.ogjg.back.user.domain;

import com.ogjg.back.user.dto.EmailAuthSaveDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class EmailAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_auth_id")
    private Long id;

    @NotNull
    private String email;

    private String client_id;

    private String emailToken;

    private boolean status = false;

    private LocalDateTime createdAt;

    private LocalDateTime authenticatedAt;

    @OneToOne(mappedBy = "emailAuth")
    private User user;

    public void inPutEmailToken(String emailToken) {
        this.emailToken = emailToken;
    }

    public void completeEmailAuth() {
        this.status = true;
    }

    public void resetEmailAuth(String client_id) {
        this.createdAt = LocalDateTime.now();
        this.status = false;
        this.authenticatedAt = null;
        this.client_id = client_id;
        this.emailToken = null;
    }

    public void completeEmailAuthTime() {
        this.authenticatedAt = LocalDateTime.now();
    }

    public EmailAuth(EmailAuthSaveDto emailAuthSaveDto) {
        this.client_id = emailAuthSaveDto.getClient_id();
        this.email = emailAuthSaveDto.getEmail();
        this.createdAt = LocalDateTime.now();
    }
}

