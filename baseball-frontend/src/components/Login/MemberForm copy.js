import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

const MemberForm = ({ addMember }) => {
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
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        const idRegex = /^[a-zA-Z0-9]{4,12}$/;
        const pwRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
        const phoneRegex = /^\d{10,11}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const postRegex = /^\d{5}$/;

        if (!idRegex.test(memberId)) errors.memberId = "아이디는 4-12자의 영문 대소문자와 숫자만 사용할 수 있습니다.";
        if (!pwRegex.test(memberPw)) errors.memberPw = "비밀번호는 6-20자의 영문 대소문자와 숫자를 포함해야 합니다.";
        if (!phoneRegex.test(memberPhone)) errors.memberPhone = "전화번호는 10-11자의 숫자만 포함해야 합니다.";
        if (!emailRegex.test(memberEmail)) errors.memberEmail = "이메일 형식이 올바르지 않습니다.";
        if (!postRegex.test(memberPost)) errors.memberPost = "우편번호는 5자리 숫자여야 합니다.";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addMember({ memberId, memberPw, memberName, memberPhone, memberEmail, memberAddress, memberAddressDetail, memberPost, memberTeamCode, memberImg });
        }
    };

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
                    {errors.memberId && <span>{errors.memberId}</span>}
                </div>
                <div>
                    <label>비밀번호 : </label>
                    <input type="password"
                           id="memberPw"
                           value={memberPw}
                           onChange={(e) => setMemberPw(e.target.value)}
                           required />
                    {errors.memberPw && <span>{errors.memberPw}</span>}
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
                    {errors.memberPhone && <span>{errors.memberPhone}</span>}
                </div>
                <div>
                    <label>이메일 : </label>
                    <input type="email"
                           id="memberEmail"
                           value={memberEmail}
                           onChange={(e) => setMemberEmail(e.target.value)}
                           required />
                    {errors.memberEmail && <span>{errors.memberEmail}</span>}
                </div>
                <div>
                    <label>우편번호 : </label>
                    <input type="text"
                           id="memberPost"
                           value={memberPost}
                           onChange={(e) => setMemberPost(e.target.value)}
                           required />
                    {errors.memberPost && <span>{errors.memberPost}</span>}
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