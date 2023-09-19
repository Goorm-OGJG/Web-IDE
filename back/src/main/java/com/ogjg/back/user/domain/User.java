package com.ogjg.back.user.domain;

import com.ogjg.back.user.dto.request.UserRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
@Getter
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

    public void userCancel(){
        this.userStatus = UserStatus.INACTIVE;
    }

    public User(UserRequest userRequest) {
        this.email = userRequest.getEmail();
        this.password = userRequest.getPassword();
        this.name = userRequest.getName();
    }

}

enum UserStatus{
    ACTIVE,
    INACTIVE
}