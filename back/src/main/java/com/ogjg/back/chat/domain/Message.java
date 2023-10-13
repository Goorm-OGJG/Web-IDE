package com.ogjg.back.chat.domain;

import com.ogjg.back.user.domain.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter
public class Message {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "email")
    private User user;

    private MessageType type;

    private String userImg;

    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder
    public Message(Room room, User user, MessageType type, String content, String userImg, LocalDateTime createdAt) {
        this.room = room;
        this.user = user;
        this.type = type;
        this.content = content;
        this.userImg = userImg;
        this.createdAt = createdAt;
    }
}
