package base.ball.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Member;
import base.ball.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	MemberMapper memberMapper;
	
	@Override
	public List<Member> findAllMember() {
		return memberMapper.findAllMember();
	}
	
	@Override
	public void insertMember(Member member) {
		memberMapper.insertMember(member);
	}
	
	@Override
	public int idCheck(String memberId) {
		return memberMapper.idCheck(memberId);
	}
	
	@Override
	public int signup(Member member) {
		return memberMapper.signup(member);
	}
	
	@Override
	public Map<String, Object> login(Member member) {
		Member loginMember = memberMapper.login(member);
		
		Map<String, Object> map = new HashMap<>();
		map.put("loginMember", loginMember);
		
		return map;
	}
}