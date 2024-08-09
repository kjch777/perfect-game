package base.ball.service;

import base.ball.dto.Chat;

public interface ChatService {
	void insertMessage(Chat chat);
	void deleteMessage(Chat chat);
}
