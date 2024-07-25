import React, {useState} from "react";

const MemberForm = ({addMember}) => {
    const [member_id, setMember_id] = useState('');
    const [member_pw, setMember_pw] = useState('');
    const [member_pw_check, setMember_pw_check] = useState('');
    const [member_name, setMember_name] = useState('');
    const [member_phone, setMember_phone] = useState('');
    const [member_email, setMember_email] = useState('');
    const [member_address, setMember_address] = useState('');
    const [member_address_detail, setMember_address_detail] = useState('');
    const [member_post, setMember_post] = useState('');
    const [member_team_code, setMember_team_code] = useState('');
    const [member_img, setMember_img] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addMember({member_id, member_pw, member_pw_check, member_name,
            member_phone, member_email, member_address, member_address_detail, 
            member_post
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디 : </label>
                    <input type="text"
                           value={member_id}
                           onChange={(e) => setMember_id(e.target.value)}
                           required />
                </div>
                <div>
                    <label>비밀번호 : </label>
                    <input type="password"
                           value={member_pw}
                           onChange={(e) => setMember_pw(e.target.value)}
                           required />
                </div>
                <div>
                    <label>비밀번호 : </label>
                    <input type="password"
                           value={member_pw_check}
                           onChange={(e) => setMember_pw_check(e.target.value)}
                           required />
                </div>
                <div>
                    <label>이름 : </label>
                    <input type="text"
                           value={member_name}
                           onChange={(e) => setMember_name(e.target.value)}
                           required />
                </div>
                <div>
                    <label>전화번호 : </label>
                    <input type="text"
                           value={member_phone}
                           onChange={(e) => setMember_phone(e.target.value)}
                           required />
                </div>
                <div>
                    <label>이메일 : </label>
                    <input type="email"
                           value={member_email}
                           onChange={(e) => setMember_email(e.target.value)}
                           required />
                </div>
                <div>
                    <label>우편번호 : </label>
                    <input type="text"
                           value={member_post}
                           onChange={(e) => setMember_post(e.target.value)}
                           required />
                </div>
                <div>
                    <label>주소 : </label>
                    <input type="text"
                           value={member_address}
                           onChange={(e) => setMember_address(e.target.value)}
                           required />
                </div>
                <div>
                    <label>상세주소 : </label>
                    <input type="text"
                           value={member_address_detail}
                           onChange={(e) => setMember_address_detail(e.target.value)}
                           required />
                </div>
                {/*
                <div>
                    <label>좋아하는 팀 : </label>
                    <input type="text"
                           value={member_team_code}
                           onChange={(e) => setMember_team_code(e.target.value)}
                           required />
                </div>
                <div>
                    <label>이미지 : </label>
                    <input type="file"
                           value={member_img}
                           onChange={(e) => setMember_img(e.target.value)}
                           required />
                </div>
                */}
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}
export default MemberForm;