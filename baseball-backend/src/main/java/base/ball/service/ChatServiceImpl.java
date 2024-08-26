package base.ball.service;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Chat;
import base.ball.mapper.ChatMapper;

@Service
public class ChatServiceImpl implements ChatService{
	
	@Autowired
	private ChatMapper chatMapper;
	
	@Override
	public void insertMessage(Chat chat) {
		System.out.println("메시지 " + chat);		
		chatMapper.insertMessage(chat);
		
	}
	
	@Override
	public void deleteMessage(@Param("memberId") String memberId,@Param("message") String message,@Param("sendTime") String sendTime) {
		chatMapper.deleteMessage(memberId,message,sendTime);
		
	}
}