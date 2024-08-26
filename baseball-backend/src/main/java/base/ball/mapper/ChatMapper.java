package base.ball.mapper;



import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestBody;

import base.ball.dto.Chat;


@Mapper
public interface ChatMapper {
	void insertMessage(@RequestBody Chat chat);
	
	void deleteMessage(
			@Param("memberId") String memberId,
			@Param("message") String message,
			@Param("sendTime") String sendTime);

	
}
