import React, { useState } from "react";
import {Link} from "react-router-dom";
import '../css/MemberForm.css';

const SignupForm = ({ addMember }) => {
    const [memberId, setMemberId] = useState('');
    const [memberPw, setMemberPw] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberPhone, setMemberPhone] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberAddress, setMemberAddress] = useState('');
    const [memberAddressDetail, setMemberAddressDetail] = useState('');
    const [memberPost, setMemberPost] = useState('');
    const [memberTeamCode, setMemberTeamCode] = useState('');
    const [memberImg, setMemberImg] = useState('');
    const [errors, setErrors] = useState({});
    const [validations, setValidations] = useState({});

    const validateId = (id) => {
        const idRegex = /^[a-z0-9]{4,12}$/;
        return idRegex.test(id) ? "" : "아이디는 4-12자의 소문자와 숫자만 사용할 수 있습니다.";
    };

    const validatePw = (pw) => {
        const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^*+=-])[a-zA-Z\d!@#$%^*+=-]{4,18}$/;
        return pwRegex.test(pw) ? "" : "비밀번호는 4-18자의 영문 대/소문자, 숫자 및 특수문자(!@#$%^*+=-)를 포함해야 합니다.";
    };

    const validatePasswordConfirm = (pw, pwConfirm) => {
        return pw === pwConfirm ? "" : "비밀번호가 일치하지 않습니다.";
    };

    const validateName = (name) => {
        const nameRegex = /^[가-힣]{2,4}$/;
        return nameRegex.test(name) ? "" : "이름은 2-4자의 한글만 사용할 수 있습니다.";
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
        return phoneRegex.test(phone) ? "" : "전화번호는 01x-xxxx-xxxx 또는 01x-xxx-xxxx 형식이어야 합니다.";
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? "" : "이메일 형식이 올바르지 않습니다.";
    };

    const validatePost = (post) => {
        const postRegex = /^\d{5,6}$/;
        return postRegex.test(post) ? "" : "우편번호는 5-6자리 숫자여야 합니다.";
    };

    const handleChange = (setter, validator) => (e) => {
        const value = e.target.value;
        setter(value);
        const newErrors = { ...errors, [e.target.id]: validator(value) };
        setErrors(newErrors);
        setValidations(prevValidations => ({
            ...prevValidations,
            [e.target.id]: validator(value)
        }));
    };

    const handlePasswordConfirmChange = (e) => {
        const value = e.target.value;
        setPasswordConfirm(value);
        const newErrors = { ...errors, passwordConfirm: validatePasswordConfirm(memberPw, value) };
        setErrors(newErrors);
        setValidations(prevValidations => ({
            ...prevValidations,
            passwordConfirm: validatePasswordConfirm(memberPw, value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = {
            memberId: validateId(memberId),
            memberPw: validatePw(memberPw),
            passwordConfirm: validatePasswordConfirm(memberPw, passwordConfirm),
            memberName: validateName(memberName),
            memberPhone: validatePhone(memberPhone),
            memberEmail: validateEmail(memberEmail),
            memberPost: validatePost(memberPost)
        };

        setErrors(formErrors);

        if (Object.values(formErrors).every(error => error === "")) {
            addMember({ memberId, memberPw, memberName, memberPhone, memberEmail, memberAddress, memberAddressDetail, memberPost, memberTeamCode, memberImg });
        }
    };

    return (
        <div className="signup-form">
            <h1>Perfect Game 회원가입</h1>
            <form onSubmit={handleSubmit}>
                <div className="memberName" id="signup-container">
                    <label>이름</label><br/>
                    <input 
                        type="text"
                        id="memberName"
                        value={memberName}
                        onChange={handleChange(setMemberName, validateName)}
                        placeholder="이름을 입력하세요"
                        required 
                    />
                    {errors.memberName && <span className="error">{errors.memberName}</span>}
                    {validations.memberName && !errors.memberName && <span className="valid">{validations.memberName}</span>}
                </div>
                <div className="memberId" id="signup-container">
                    <label>아이디</label><br/>
                    <input 
                        type="text"
                        id="memberId"
                        value={memberId}
                        onChange={handleChange(setMemberId, validateId)}
                        placeholder="아이디를 입력하세요"
                        required 
                    />
                    {errors.memberId && <span className="error">{errors.memberId}</span>}
                    {validations.memberId && !errors.memberId && <span className="valid">{validations.memberId}</span>}
                </div>
                <div className="memberPw" id="signup-container">
                    <label>비밀번호</label><br/>
                    <input 
                        type="password"
                        id="memberPw"
                        value={memberPw}
                        onChange={handleChange(setMemberPw, validatePw)}
                        placeholder="비밀번호를 입력하세요"
                        required 
                    />
                    {errors.memberPw && <span className="error">{errors.memberPw}</span>}
                    {validations.memberPw && !errors.memberPw && <span className="valid">{validations.memberPw}</span>}
                </div>
                <div className="passwordConfirm" id="signup-container">   
                    <label>비밀번호 확인</label><br/>
                    <input 
                        type="password"
                        id="passwordConfirm"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                        placeholder="비밀번호를 입력하세요"
                        required 
                    />
                    {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
                    {validations.passwordConfirm && !errors.passwordConfirm && <span className="valid">{validations.passwordConfirm}</span>}
                </div>
                <div className="memberPhone" id="signup-container">
                    <label>핸드폰 번호</label><br/>
                    <input 
                        type="text"
                        id="memberPhone"
                        value={memberPhone}
                        onChange={handleChange(setMemberPhone, validatePhone)}
                        placeholder="전화번호를 입력하세요"
                        required 
                    />
                    {errors.memberPhone && <span className="error">{errors.memberPhone}</span>}
                    {validations.memberPhone && !errors.memberPhone && <span className="valid">{validations.memberPhone}</span>}
                </div>
                <div className="memberEmail" id="signup-container">
                    <label>이메일</label><br/>
                    <input 
                        type="email"
                        id="memberEmail"
                        value={memberEmail}
                        onChange={handleChange(setMemberEmail, validateEmail)}
                        placeholder="이메일 주소를 입력하세요"
                        required 
                    />
                    {errors.memberEmail && <span className="error">{errors.memberEmail}</span>}
                    {validations.memberEmail && !errors.memberEmail && <span className="valid">{validations.memberEmail}</span>}
                </div>
                <div className="memberPost" id="signup-container">
                    <label>우편번호</label><br/>
                    <input 
                        type="text"
                        id="memberPost"
                        value={memberPost}
                        onChange={handleChange(setMemberPost, validatePost)}
                        placeholder="우편번호를 입력하세요"
                        required 
                    />
                    {errors.memberPost && <span className="error">{errors.memberPost}</span>}
                    {validations.memberPost && !errors.memberPost && <span className="valid">{validations.memberPost}</span>}
                </div>
                <div className="memberAddress" id="signup-container">
                    <label>주소</label><br/>
                    <input 
                        type="text"
                        id="memberAddress"
                        value={memberAddress}
                        onChange={handleChange(setMemberAddress, () => "")}
                        placeholder="주소를 입력하세요"
                        required 
                    />
                </div>
                <div className="memberAddressDetail" id="signup-container">
                    <label>상세주소</label><br/>
                    <input 
                        type="text"
                        id="memberAddressDetail"
                        value={memberAddressDetail}
                        onChange={handleChange(setMemberAddressDetail, () => "")}
                        placeholder="상세주소를 입력하세요"
                        required 
                    />
                </div>
                <div className="memberTeamCode" id="signup-container">
                    <label>응원하는 팀</label><br/>
                    <select 
                        id="memberTeamCode"
                        value={memberTeamCode}
                        onChange={(e) => setMemberTeamCode(e.target.value)}
                        required
                    >
                        <option value="">응원하는 팀을 선택하세요</option>
                        <option disabled>----------------------------</option>
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
                    </select>
                </div>
                <div className="memberImg" id="signup-container">
                    <label>이미지</label><br/>
                    <input 
                        type="text"
                        id="memberImg"
                        value={memberImg}
                        onChange={(e) => setMemberImg(e.target.value)} 
                        placeholder="이미지를 선택하세요"
                    />
                </div>
                <div>
                    <button type="submit" className="signup-button">회원가입</button>
                </div>
                <div className="login-link">
                    <p>계정이 있으신가요?</p>
                    <Link to="/login">로그인</Link>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;