package base.ball.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Member;
import base.ball.mapper.MypageMapper;

@Service
public class MypageService {

	 @Autowired
	    private MypageMapper mypageMapper;

	    public Member getMemberById(String memberId) {
	        return mypageMapper.getMemberById(memberId);
	    }
	    
	    public int updateMember(Member member) {
	        return mypageMapper.updateMember(member);
	    }
	    
	    public int deleteMember(String memberPw) {
	    	return mypageMapper.deleteMember(memberPw);
	    }
}
