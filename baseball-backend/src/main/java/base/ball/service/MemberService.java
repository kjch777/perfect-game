package base.ball.service;

import java.util.List;

import base.ball.dto.Member;

public interface MemberService {
	List<Member> findAllMember();
	
	void insertMember(Member member);
}

