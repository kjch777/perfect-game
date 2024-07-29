import React from 'react';

const MemberTable1 = ({members, deleteMember}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>삭제하기</th>
                </tr>
            </thead>
            <tbody>
                {members.map(member => (
                    <tr key={member.memberNo}>
                        <td>{member.memberNo}</td>
                        <td>{member.memberId}</td>
                        <td>{member.memberName}</td>
                        <td>{member.memberEmail}</td>
                        <td>
                            <button onClick={() => deleteMember(member.memberNo)}>유저 삭제하기</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default MemberTable1;