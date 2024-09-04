package base.ball.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.NaverUser;
import base.ball.service.NaverUserService;

@RestController
public class NaverRegistController {
	@Autowired
	private NaverUserService naverUserService;
	
	@PostMapping("/NaverAPI/register")
	public String insertNaverUser(@RequestBody NaverUser naverUser) {
		naverUserService.insertNaverUser(naverUser);

		
		return "Naver API를 활용한 회원가입 성공!!";
	}
}
