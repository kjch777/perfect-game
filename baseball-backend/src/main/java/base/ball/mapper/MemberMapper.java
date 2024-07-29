package base.ball.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import base.ball.dto.Member;

@Mapper
public interface MemberMapper {
	List<Member> findAllMember();
	
	void insertMember(Member member);
	
	int idCheck(String memberId);
	int signup(Member member);
	
	Member login(Member member);
}
