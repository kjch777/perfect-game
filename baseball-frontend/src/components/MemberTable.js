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
                    <tr key={member.member_no}>
                        <td>{member.member_id}</td>
                        <td>{member.member_pw}</td>
                        <td>{member.member_name}</td>
                        <td>{member.member_phone}</td>
                        <td>{member.member_email}</td>
                        <td>{member.member_address}</td>
                        <td>{member.member_address_detail}</td>
                        <td>{member.member_post}</td>
                        <td>{member.member_team_code}</td>
                        <td>{member.member_img}</td>
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