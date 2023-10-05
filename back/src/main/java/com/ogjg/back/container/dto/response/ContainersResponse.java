package com.ogjg.back.container.dto.response;

import com.ogjg.back.container.domain.Container;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class ContainersResponse {

    private Long containerId;
    private String name;
    private String url;
    private String language;
    private Long storage;
    private String info;
    private LocalDateTime updatedDate;
    private LocalDateTime createdDate;
    private boolean pinned;
    private String owner;
    private boolean isPrivate;
    private List<UserImg> usersImg;

    @Builder
    public ContainersResponse(Container container) {
        this.containerId = container.getContainerId();
        this.name = container.getName();
        this.url = container.getContainerUrl();
        this.language = container.getLanguage();
        this.storage = container.getAvailableStorage();
        this.info = container.getDescription();
        this.updatedDate = container.getModifiedAt();
        this.createdDate = container.getCreatedAt();
        this.pinned = container.getIsPinned();
        this.owner = container.getUser().getEmail();
        this.isPrivate = container.getIsPrivate();
        this.usersImg = new ArrayList<>(
                List.of(UserImg.builder()
                        .email(container.getUser().getEmail())
                        .userName(container.getUser().getName())
                        .imgUrl(container.getUser().getUserImg())
                        .build())
        );
    }

    @Getter
    @Setter
    public static class UserImg {
        private String email;
        private String imgUrl;
        private String userName;

        @Builder
        public UserImg(String email, String imgUrl, String userName) {
            this.email = email;
            this.imgUrl = imgUrl;
            this.userName = userName;
        }
    }
}
