package com.ogjg.back.chat.controller;

import com.ogjg.back.chat.domain.MessageType;
import com.ogjg.back.chat.dto.ChattingRoomUserInfoDto;
import com.ogjg.back.chat.dto.MessageDto;
import com.ogjg.back.chat.service.MessageService;
import com.ogjg.back.common.exception.ErrorCode;
import com.ogjg.back.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
@Slf4j
public class MessageController {

    private final MessageService messageService;

    @MessageMapping("/enter-room/{roomId}")
    @SendTo("/sub/room/{roomId}")
    public MessageDto enterRoom(
            @DestinationVariable Long roomId,
            @Payload MessageDto message,
            SimpMessageHeaderAccessor headerAccessor
    ) {

        messageService.addUserInfoInSessionAttribute(message, headerAccessor);
        messageService.saveUserRoom(message);

        message.setType(MessageType.ENTER);
        message.setContent(message.getSender() + "님이 입장하셨습니다.");

        messageService.saveMessage(message);
        return message;
    }

    @MessageMapping("/send-message")
    public void sendMessage(@Payload MessageDto message) {
        messageService.saveAndSendMessage(message);
    }

    @GetMapping("/{containerId}/users")
    public ApiResponse<?> getUsersInChattingRoom(@PathVariable Long containerId) {

        List<ChattingRoomUserInfoDto> users = messageService.getUsersInChattingRoom(containerId);
        return new ApiResponse<>(ErrorCode.SUCCESS, users);
    }

    @GetMapping("/{containerId}/messages")
    public ApiResponse<?> getMessagesInChattingRoom(@PathVariable Long containerId) {

        List<MessageDto> responseData = messageService.getMessagesInChattingRoom(containerId);
        return new ApiResponse<>(ErrorCode.SUCCESS, responseData);
    }
}
