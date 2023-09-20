package com.ogjg.back.user.domain;

import com.ogjg.back.user.dto.request.UserRequest;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.*;

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

    public User(UserRequest userRequest) {
        this.email = userRequest.getEmail();
        this.password = userRequest.getPassword();
        this.name = userRequest.getName();
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

    public static User reference(String loginEmail) {
        return User.builder()
                .email(loginEmail)
                .build();
    }

    public User updateImg(String aws_url) {
        this.userImg = aws_url;
        return this;
    }

    public User updateInfo(String name) {
        this.name = name;
        return this;
    }

    public User updatePassword(String password) {
        this.password = password;
        return this;
    }

    public User deactivate() {
        this.userStatus = UserStatus.INACTIVE;
        return this;
    }
}

