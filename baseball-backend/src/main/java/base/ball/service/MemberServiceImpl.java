package base.ball.service;

import java.util.List;

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
}
