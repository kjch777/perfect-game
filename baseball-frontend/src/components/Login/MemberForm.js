import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import MemberTable from "./MemberTable";

const MemberForm = ({addMember}) => {
    const [memberId, setMemberId] = useState('');
    const [memberPw, setMemberPw] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberPhone, setMemberPhone] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberAddress, setMemberAddress] = useState('');
    const [memberAddressDetail, setMemberAddressDetail] = useState('');
    const [memberPost, setMemberPost] = useState('');
    const [memberTeamCode, setMemberTeamCode] = useState('');
    const [memberImg, setMemberImg] = useState('');
    const [service, setService] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addMember({memberId, memberPw, memberName,
            memberPhone, memberEmail, memberAddress, memberAddressDetail, 
            memberPost, memberTeamCode, memberImg
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디 : </label>
                    <input type="text"
                           id="memberId"
                           value={memberId}
                           onChange={(e) => setMemberId(e.target.value)}
                           required />
                </div>
                <div>
                    <label>비밀번호 : </label>
                    <input type="password"
                           id="memberPw"
                           value={memberPw}
                           onChange={(e) => setMemberPw(e.target.value)}
                           required />
                </div>
                <div>
                    <label>이름 : </label>
                    <input type="text"
                           id="memberName"
                           value={memberName}
                           onChange={(e) => setMemberName(e.target.value)}
                           required />
                </div>
                <div>
                    <label>전화번호 : </label>
                    <input type="text"
                           id="memberPhone"
                           value={memberPhone}
                           onChange={(e) => setMemberPhone(e.target.value)}
                           required />
                </div>
                <div>
                    <label>이메일 : </label>
                    <input type="email"
                           id="memberEmail"
                           value={memberEmail}
                           onChange={(e) => setMemberEmail(e.target.value)}
                           required />
                </div>
                <div>
                    <label>우편번호 : </label>
                    <input type="text"
                           id="memberPost"
                           value={memberPost}
                           onChange={(e) => setMemberPost(e.target.value)}
                           required />
                </div>
                <div>
                    <label>주소 : </label>
                    <input type="text"
                           id="memberAddress"
                           value={memberAddress}
                           onChange={(e) => setMemberAddress(e.target.value)}
                           required />
                </div>
                <div>
                    <label>상세주소 : </label>
                    <input type="text"
                           id="memberAddressDetail"
                           value={memberAddressDetail}
                           onChange={(e) => setMemberAddressDetail(e.target.value)}
                           required />
                </div>

                <div>
                    <label>좋아하는 팀 : </label>
                    <Form.Select id="memberTeamCode" value={memberTeamCode} onChange={(e) => setMemberTeamCode(e.target.value)} required >
                        <option>팀 선택하기</option>
                        <option disabled>-----------------------</option>
                        <option value="1">LG 트윈스</option>
                        <option value="2">KT wiz</option>
                        <option value="3">SSG 랜더스</option>
                        <option value="4">NC 다이노스</option>
                        <option value="5">두산 베어스</option>
                        <option value="6">KIA 타이거즈</option>
                        <option value="7">롯데 자이언츠</option>
                        <option value="8">삼성 라이온즈</option>
                        <option value="9">한화 이글스</option>
                        <option value="10">키움 히어로즈</option>
                    </Form.Select>
                </div>
                <div>
                    <label>이미지 : </label>
                    <input type="text"
                           id="memberImg"
                           value={memberImg}
                           onChange={(e) => setMemberImg(e.target.value)} />
                </div>
                <div>
                    <Checkbox checked={service} onChange={setService}>
                        (필수) 서비스 이용약관
                    </Checkbox>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}
export default MemberForm;

function Checkbox({ children, disabled, checked, onChange }) {
    return (
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
        />
        {children}
      </label>
    );
}