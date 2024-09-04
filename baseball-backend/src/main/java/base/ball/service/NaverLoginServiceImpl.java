package base.ball.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.NaverUser;
import base.ball.mapper.NaverLoginMapper;

@Service
public class NaverLoginServiceImpl implements NaverLoginService {
	@Autowired
	private NaverLoginMapper naverLoginMapper;
	
	@Override
	public NaverUser naverlogin(String id, String password) {
		return naverLoginMapper.naverlogin(id,  password);
	}
}
