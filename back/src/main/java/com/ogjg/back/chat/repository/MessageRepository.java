package com.ogjg.back.chat.repository;

import com.ogjg.back.chat.domain.Message;
import com.ogjg.back.chat.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<List<Message>> findByRoom_Container_ContainerId(Long containerId);

    Optional<List<Message>> findAllByRoom(Room room);
}