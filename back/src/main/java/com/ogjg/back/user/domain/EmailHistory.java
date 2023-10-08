package com.ogjg.back.user.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
public class EmailHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private final LocalDateTime emailSendAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private EmailStatus emailStatus;

    @Enumerated(EnumType.STRING)
    private EmailMessage emailMessage;

    public EmailHistory(String email, EmailStatus emailStatus, EmailMessage emailMessage) {
        this.email = email;
        this.emailStatus = emailStatus;
        this.emailMessage = emailMessage;
    }
}


