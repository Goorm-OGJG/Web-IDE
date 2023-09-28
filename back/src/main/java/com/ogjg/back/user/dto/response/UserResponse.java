package com.ogjg.back.user.dto.response;

import com.ogjg.back.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class UserResponse {

    private String email;
    private String name;
    private String userImg;

    public UserResponse(User user) {
        this.email = user.getEmail();
        this.name = user.getName();
        this.userImg = user.getUserImg();
    }
}
