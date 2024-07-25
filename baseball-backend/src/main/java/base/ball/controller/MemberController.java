package base.ball.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
