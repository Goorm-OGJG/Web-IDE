package com.ogjg.back.container.domain;

import com.ogjg.back.chat.domain.Room;
import com.ogjg.back.file.domain.Path;
import com.ogjg.back.file.exception.NotFoundFile;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.exception.UnauthorizedUserAccessException;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Container {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long containerId;

    @ManyToOne
    @JoinColumn(name = "email")
    private User user;

    @OneToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToMany(mappedBy = "container")
    private List<Path> paths = new ArrayList<>();

    @Pattern(regexp = "^[a-zA-Z0-9\\-_]{1,20}$",
            message = "컨테이너 이름에는 영문, 숫자가 포함가능하며, 특수문자는 '-', '_'만 포함될 수 있습니다.")
    private String name;

    private String description;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String containerUrl;

    @Column(nullable = false)
    private Boolean isPrivate;

    private Long availableStorage;

    @Column(nullable = false)
    private Boolean isPinned;

    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Builder
    public Container(Long containerId, User user, Room room, List<Path> paths, String name, String description, String language, String containerUrl, Boolean isPrivate, Long availableStorage, Boolean isPinned, LocalDateTime modifiedAt, LocalDateTime createdAt) {
        this.containerId = containerId;
        this.user = user;
        this.room = room;
        this.paths = paths;
        this.name = name;
        this.description = description;
        this.language = language;
        this.containerUrl = containerUrl;
        this.isPrivate = isPrivate;
        this.availableStorage = availableStorage;
        this.isPinned = isPinned;
        this.modifiedAt = modifiedAt;
        this.createdAt = createdAt;
    }

    public void updatePrivate(String email) {
        checkUserAuthorizationByEmail(email);
        this.isPrivate = !isPrivate;
    }

    public void updateDescription(String email, String info) {
        checkUserAuthorizationByEmail(email);
        this.description = info;
    }

    public void updatePinned(String email) {
        checkUserAuthorizationByEmail(email);
        this.isPinned = !isPinned;
    }

    private void checkUserAuthorizationByEmail(String email) {
        if (!email.equals(user.getEmail())) {
            throw new UnauthorizedUserAccessException();
        }
    }

    public Path findPath(String filePath, String name) {
        // todo: 1) s3와 구분되는 에러코드 고려하기
        //       2) 쿼리문 활용 최적화 필요
        return paths.stream()
                .filter((file -> file.getPath().equals(filePath)))
                .filter((file -> file.getName().equals(name)))
                .findAny()
                .orElseThrow(() -> new NotFoundFile("DB에 존재하지 않는 파일입니다."));
    }
}
