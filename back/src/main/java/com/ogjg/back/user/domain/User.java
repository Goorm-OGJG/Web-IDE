package com.ogjg.back.user.domain;

import com.ogjg.back.user.dto.SignUpSaveDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@Table(name = "users")
public class User {
    @Id
    private String email;

    private String password;

    private String name;

    private String userImg;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus = UserStatus.ACTIVE;

    @OneToOne
    @JoinColumn(name = "email_auth_id")
    private EmailAuth emailAuth;

    public User(SignUpSaveDto signUpSaveDto) {
        this.email = signUpSaveDto.getEmail();
        this.password = signUpSaveDto.getPassword();
        this.name = signUpSaveDto.getName();
        this.emailAuth = signUpSaveDto.getEmailAuth();
    }

    @Builder
    public User(String email, String password, String name, String userImg, UserStatus userStatus, EmailAuth emailAuth) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.userImg = userImg;
        this.userStatus = userStatus;
        this.emailAuth = emailAuth;
    }

    public User updateImg(String aws_url) {
        this.userImg = aws_url;
        return this;
    }

    public User updateInfo(String name) {
        this.name = name;
        return this;
    }

    public User updatePassword(String newPassword) {
        this.password = newPassword;
        return this;
    }

    public User deactivate() {
        this.userStatus = UserStatus.INACTIVE;
        return this;
    }
}

