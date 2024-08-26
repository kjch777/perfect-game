package base.ball.controller;

import java.time.LocalTime;


import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Chat;
import base.ball.service.ChatService;
import base.ball.vo.ChatMessage;

@RestController

public class ChatController {
	
	@MessageMapping("/chat.send")
	@SendTo("/topic/messages")
	public ChatMessage send(ChatMessage message) {
		Chat chatMsg = new Chat();		
		chatMsg.setMemberId(message.getSender());
		chatMsg.setMessage(message.getContent());
		chatMsg.setSendTime(LocalTime.now().toString());
		System.out.println(chatMsg.getMemberId());
		System.out.println(chatMsg.getMessage());
		System.out.println(chatMsg.getSendTime());
		
		chatService.insertMessage(chatMsg);
		
		
		return message;
	}
	
	@Autowired
	private ChatService chatService;
	Chat toDeleteMessage = new Chat();
	Chat chat = new Chat();
	
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
    @MessageMapping("/chat.deleteMessage")
    @SendTo("/topic/deleteMessage")
    public Chat deleteMessageWindow(@RequestBody Chat chat) {
    	toDeleteMessage = chat;
    	return chat;
    }
    
    @GetMapping("/chat/delete")
    public Chat getDeleteMessage() {
    	return toDeleteMessage;
    }
    
	

}
