package base.ball.controller;

import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import base.ball.dto.Chat;
import base.ball.service.ChatService;
import base.ball.vo.ChatMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@MessageMapping("/chat.send")
	@SendTo("/topic/messages")
	public ChatMessage send(ChatMessage message) {
		return message;
	}
	
	@Autowired
	private ChatService chatService;
	
	@PostMapping()
	public String insertMessage(@RequestBody Chat chat) {
	
		
		chatService.insertMessage(chat);
		
		return "메시지";
	}
	
	

}
