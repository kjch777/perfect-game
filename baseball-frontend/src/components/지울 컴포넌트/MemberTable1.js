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
                {members.map(test => (
                    <tr key={test.memberNo}>
                        <td>{test.memberNo}</td>
                        <td>{test.memberId}</td>
                        <td>{test.memberName}</td>
                        <td>{test.memberEmail}</td>
                        <td>
                            <button onClick={() => deleteMember(test.memberNo)}>유저 삭제하기</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default MemberTable1;