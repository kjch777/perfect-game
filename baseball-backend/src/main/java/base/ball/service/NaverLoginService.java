package base.ball.service;

import base.ball.dto.NaverUser;

public interface NaverLoginService {
	NaverUser naverlogin(String id, String password);
}
