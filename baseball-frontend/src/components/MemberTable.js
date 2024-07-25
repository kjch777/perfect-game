import React from 'react';

const MemberTable = ({members}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>아이디</th>
                    <th>비밀번호</th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>우편번호</th>
                    <th>주소</th>
                    <th>상세주소</th>
                    <th>좋아하는 팀</th>
                    <th>이미지</th>
                    <th>삭제하기</th>
                </tr>
            </thead>
            <tbody>
                {members.map(member => (
                    <tr key={member.memberNo}>
                        <td>{member.memberNo}</td>
                        <td>{member.memberId}</td>
                        <td>{member.memberPw}</td>
                        <td>{member.memberName}</td>
                        <td>{member.memberPhone}</td>
                        <td>{member.memberEmail}</td>
                        <td>{member.memberAddress}</td>
                        <td>{member.memberAddressDetail}</td>
                        <td>{member.memberPost}</td>
                        <td>{member.memberTeamCode}</td>
                        <td>{member.memberImg}</td>
                        <td>
                            <button>회원 삭제하기</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default MemberTable;