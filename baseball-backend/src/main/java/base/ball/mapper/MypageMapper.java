package base.ball.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import base.ball.dto.Member;

@Mapper
public interface MypageMapper {
	
	Member getMemberById(@Param("memberId") String memberId);
	
	int updateMember(Member member);
	int deleteMember(@Param("memberPw") String memberPw);
}
