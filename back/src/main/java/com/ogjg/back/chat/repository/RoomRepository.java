package com.ogjg.back.chat.repository;

import com.ogjg.back.chat.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByContainerContainerId(Long containerId);
}