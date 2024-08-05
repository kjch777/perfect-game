package base.ball.common.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import base.ball.common.vo.ChatMessage;

@Controller
public class ChatController {
	
	@MessageMapping("/chat.send")
	@SendTo("/topic/messages")
	public ChatMessage send(ChatMessage message) {
		return message;
	}
}
