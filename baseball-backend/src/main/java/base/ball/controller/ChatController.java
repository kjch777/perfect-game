package base.ball.controller;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Chat;
import base.ball.service.ChatService;
import base.ball.vo.ChatMessage;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        Chat chatMsg = new Chat();
        chatMsg.setMemberId(message.getSender());
        chatMsg.setMessage(message.getContent());

        DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String msgTime = LocalDateTime.now().format(timeFormat);
        chatMsg.setSendTime(msgTime);

        chatService.insertMessage(chatMsg);

        return message;
    }

    // HTTP POST 요청으로 메시지 추가
    @PostMapping()
    public ResponseEntity<Void> insertMessage(@RequestBody Chat chat) {
        chatService.insertMessage(chat);
        return ResponseEntity.ok().build();
    }

    // HTTP DELETE 요청으로 메시지 삭제
    @DeleteMapping("/chat/delete")
    public ResponseEntity<Void> deleteMessage(
        @RequestParam("memberId") String memberId,
        @RequestParam("message") String message,
        @RequestParam("sendTime") String sendTime) {

        chatService.deleteMessage(memberId, message, sendTime);

        return ResponseEntity.ok().build();
    }

    // STOMP 메시지 핸들러 - 삭제된 메시지 브로드캐스트
    @MessageMapping("/chat.deleteMessage")
    @SendTo("/topic/deleteMessage")
    public Chat deleteMessageWindow(@RequestBody Chat chat) {
        if (chat != null) {
        } else {
            System.out.println("Received null chat object");
        }
        return chat;
    }
}
