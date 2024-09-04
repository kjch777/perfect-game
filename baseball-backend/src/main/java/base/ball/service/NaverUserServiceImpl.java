package base.ball.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.NaverUser;
import base.ball.mapper.NaverUserMapper;

@Service
public class NaverUserServiceImpl implements NaverUserService {
	@Autowired
	NaverUserMapper naverUserMapper;
	
	@Override
	public void insertNaverUser(NaverUser user) {
		naverUserMapper.insertNaverUser(user);
	}
}
