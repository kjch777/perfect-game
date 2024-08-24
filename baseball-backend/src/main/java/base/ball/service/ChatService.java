package base.ball.service;


import org.apache.ibatis.annotations.Param;

import base.ball.dto.Chat;


public interface ChatService {
	void insertMessage(Chat chat);
	
	void deleteMessage(@Param("memberId") String memberId,@Param("message") String message,@Param("sendTime") String sendTime);

	
}
