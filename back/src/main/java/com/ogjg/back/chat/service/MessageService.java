package com.ogjg.back.chat.service;

import com.ogjg.back.chat.domain.Message;
import com.ogjg.back.chat.domain.MessageType;
import com.ogjg.back.chat.domain.Room;
import com.ogjg.back.chat.domain.UserRoom;
import com.ogjg.back.chat.dto.ChattingRoomUserInfoDto;
import com.ogjg.back.chat.dto.MessageDto;
import com.ogjg.back.chat.repository.MessageRepository;
import com.ogjg.back.chat.repository.RoomRepository;
import com.ogjg.back.chat.repository.UserRoomRepository;
import com.ogjg.back.container.domain.Container;
import com.ogjg.back.container.repository.ContainerRepository;
import com.ogjg.back.user.domain.User;
import com.ogjg.back.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageService {

    private final SimpMessageSendingOperations template;
    private final MessageRepository messageRepository;
    private final RoomRepository roomRepository;
    private final UserRoomRepository userRoomRepository;
    private final UserRepository userRepository;
    private final ContainerRepository containerRepository;


    @Transactional
    public void saveUserRoom(MessageDto message) {
        UserRoom.UserRoomPK userRoomPK = new UserRoom.UserRoomPK(message.getSender(), message.getContainerId());
        UserRoom userRoom = new UserRoom(userRoomPK);
        userRoomRepository.save(userRoom);
    }

    @Transactional
    public void saveMessage(MessageDto message) {
        log.info("Message Email: {}", message.getEmail());
        User user = userRepository.findByEmail(message.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        Container container = containerRepository.findById(message.getContainerId())
                .orElseThrow(() -> new IllegalArgumentException("컨테이너가 존재하지 않습니다."));

        if (roomRepository.findByContainerContainerId(container.getContainerId()).isEmpty()) {
            Room room = new Room(container);
            roomRepository.save(room);
        }

        Room room = roomRepository.findByContainerContainerId(container.getContainerId())
                .orElseThrow(() -> new IllegalArgumentException("해당 채팅방이 존재하지 않습니다."));

        Message chatMessage = Message.builder()
                .room(room)
                .user(user)
                .type(message.getType())
                .content(message.getContent())
                .createdAt(message.getCreatedAt())
                .build();

        messageRepository.save(chatMessage);
    }

    @Transactional
    public void sendMessage(MessageDto message) {
        log.info("접속 채팅방 ID: {}", message.getContainerId());
        log.info("접속 채팅방 Content: {}", message.getContent());
        template.convertAndSend("/sub/room/" + message.getContainerId(), message);
    }

    public void addUserInfoInSessionAttribute(MessageDto message, SimpMessageHeaderAccessor headerAccessor) {
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        if (sessionAttributes == null) {
            throw new IllegalArgumentException("STOMP SessionHeader Error.");
        }
        log.info("세션 정보: {}", sessionAttributes);
        sessionAttributes.put("email", message.getEmail());
        sessionAttributes.put("username", message.getSender());
    }

    @EventListener
    @Transactional
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        if (sessionAttributes == null) {
            throw new IllegalArgumentException("STOMP SessionHeader Error.");
        }

        String email = (String) sessionAttributes.get("email");
        String username = (String) sessionAttributes.get("username");

        List<UserRoom> userRooms = userRoomRepository.findById_Email(email)
                .orElseThrow(() -> new IllegalArgumentException("[이메일] 잘못된 접근입니다."));
        log.info("UserRooms: {}", userRooms);
        userRoomRepository.deleteAll(userRooms);

        log.info("UserRooms: {}", userRooms);
        String leaveMessage = username + "님이 퇴장하셨습니다.";
        for (UserRoom userRoom : userRooms) {
            MessageDto message = MessageDto.builder()
                    .type(MessageType.LEAVE)
                    .containerId(userRoom.getId().getRoomId())
                    .email(email)
                    .sender(username)
                    .content(leaveMessage)
                    .build();
            template.convertAndSend("/sub/room/" + userRoom.getId().getRoomId(), message);
        }
    }

    @Transactional(readOnly = true)
    public List<ChattingRoomUserInfoDto> getUsersInChattingRoom(Long containerId) {

        List<UserRoom> userRooms = userRoomRepository.findById_RoomId(containerId)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 컨테이너입니다."));

        List<ChattingRoomUserInfoDto> users = new ArrayList<>();
        for (UserRoom userRoom : userRooms) {
            String email = userRoom.getId().getEmail();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("잘못된 이메일입니다."));
            ChattingRoomUserInfoDto userInfoDto = ChattingRoomUserInfoDto.builder()
                    .email(user.getEmail())
                    .userImg(user.getUserImg())
                    .userName(user.getName())
                    .build();
            users.add(userInfoDto);
        }

        return users;
    }

    @Transactional(readOnly = true)
    public List<MessageDto> getMessagesInChattingRoom(Long containerId) {

        Room room = roomRepository.findById(containerId)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 컨테이너 요청입니다."));

        Optional<List<Message>> messages = messageRepository.findAllByRoom(room);
        if (messages.isEmpty()) {
            return new ArrayList<>();
        }

        return messages.orElseGet(ArrayList::new)
                .stream()
                .map(message -> MessageDto.builder()
                        .type(message.getType())
                        .email(message.getUser().getEmail())
                        .sender(message.getUser().getName())
                        .content(message.getContent())
                        .build())
                .toList();
    }

    @Transactional
    public void saveAndSendMessage(MessageDto message) {
        saveMessage(message);
        sendMessage(message);
    }
}
