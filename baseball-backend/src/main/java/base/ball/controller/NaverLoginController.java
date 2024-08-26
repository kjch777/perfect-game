package base.ball.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.NaverUser;
import base.ball.service.NaverLoginService;

@RestController
public class NaverLoginController {
	@Autowired
	private NaverLoginService naverLoginService;
	
	@PostMapping("/naverlogin")
	public ResponseEntity<String> login(@RequestParam("id") String id, @RequestParam("password") String password) {
		NaverUser user =  naverLoginService.naverlogin(id, password);
		if (user != null) {
			return ResponseEntity.ok("로그인 성공");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					              .body("로그인 실패");
		}
		
	}
}
