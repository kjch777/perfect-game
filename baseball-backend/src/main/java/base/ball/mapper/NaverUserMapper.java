package base.ball.mapper;

import org.apache.ibatis.annotations.Mapper;

import base.ball.dto.NaverUser;

@Mapper
public interface NaverUserMapper {
	void insertNaverUser(NaverUser user);
}
