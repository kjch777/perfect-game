package base.ball.service;

import java.util.List;
import java.util.Map;

import base.ball.dto.Member;

public interface MemberService {
	List<Member> findAllMember();
	
	void insertMember(Member member);
	
	int idCheck(String memberId);
	
	int signup(Member member);
	
	Map<String, Object> login(Member member);
}

