package base.ball.mapper;



import org.apache.ibatis.annotations.Mapper;

import base.ball.dto.Chat;

@Mapper
public interface ChatMapper {
	void insertMessage(Chat chat);
	void deleteMessage(Chat chat);
}
