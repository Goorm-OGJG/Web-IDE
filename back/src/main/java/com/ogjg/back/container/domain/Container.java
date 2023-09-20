package com.ogjg.back.container.domain;

import com.ogjg.back.user.domain.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
public class Container {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long containerId;

    @ManyToOne
    @JoinColumn(name = "email")
    private User user;

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
    public Container(Long containerId, User user, String name, String description, String language, String containerUrl, Boolean isPrivate, Long availableStorage, Boolean isPinned, LocalDateTime modifiedAt, LocalDateTime createdAt) {
        this.containerId = containerId;
        this.user = user;
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
}
