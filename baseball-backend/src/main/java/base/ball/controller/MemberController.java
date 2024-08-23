package base.ball.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Member;
import base.ball.service.MemberService;

@RestController
@RequestMapping("/members")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@GetMapping
	public List<Member> findAllMember() {
		return memberService.findAllMember();
	}
	
	@PostMapping
	public void insertMember(@RequestBody Member member) {
		memberService.insertMember(member);
	}
	
	@GetMapping("/idCheck")
	public int idCheck(@RequestParam("id") String id) {
		return memberService.idCheck(id);
	}
	
	@PostMapping(value="/signup")
	public int signup(@RequestBody Member member) {
		return memberService.signup(member);
	}
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Member member) {
		return memberService.login(member);
	}
}
