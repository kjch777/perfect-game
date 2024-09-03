package base.ball.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Member;
import base.ball.service.MypageService;

@RestController
@RequestMapping("/mypage")
public class MypageController {

	@Autowired
	private MypageService mypageService;

	@GetMapping("/{memberId}")
	public Member getMemberById(@PathVariable("memberId") String memberId) {
		return mypageService.getMemberById(memberId);
	}

	@PutMapping
	public String updateMember(@RequestBody Member member) {
		int updatedRows = mypageService.updateMember(member);
		return updatedRows > 0 ? "회원 정보가 성공적으로 수정되었습니다." : "회원 정보 수정에 실패했습니다.";
	}

	@DeleteMapping("/{memberId}")
	public String deleteMember(@RequestParam("memberPw") String memberPw) {
		int deletedRows = mypageService.deleteMember(memberPw);
		return deletedRows > 0 ? "회원 탈퇴가 성공적으로 처리되었습니다." : "회원 탈퇴에 실패했습니다.";

	}
}
