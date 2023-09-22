package com.ogjg.back.user.dto.response;

import com.ogjg.back.user.domain.User;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ImgUpdateResponse {
    private String url;

    @Builder
    public ImgUpdateResponse(String url) {
        this.url = url;
    }

    public static ImgUpdateResponse of(User user) {
        return ImgUpdateResponse.builder()
                .url(user.getUserImg())
                .build();
    }
}
