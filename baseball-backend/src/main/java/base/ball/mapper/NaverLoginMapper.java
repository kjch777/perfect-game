package base.ball.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import base.ball.dto.NaverUser;

@Mapper
public interface NaverLoginMapper {
	NaverUser naverlogin(@Param("id") String id, @Param("password") String password);
}
