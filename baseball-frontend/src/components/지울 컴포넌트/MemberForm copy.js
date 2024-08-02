import React, {useState} from "react";

const MemberForm = ({addMember}) => {
    const [member_id, setMember_id] = useState('');
    const [member_pw, setMember_pw] = useState('');
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
        addMember({member_id, member_pw, member_name,
            member_phone, member_email, member_address, member_address_detail, 
            member_post, member_team_code, member_img
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디 : </label>
                    <input type="text"
                           id="member_id"
                           value={member_id}
                           onChange={(e) => setMember_id(e.target.value)}
                           required />
                </div>
                <div>
                    <label>비밀번호 : </label>
                    <input type="password"
                           id="member_pw"
                           value={member_pw}
                           onChange={(e) => setMember_pw(e.target.value)}
                           required />
                </div>
                <div>
                    <label>이름 : </label>
                    <input type="text"
                           id="member_name"
                           value={member_name}
                           onChange={(e) => setMember_name(e.target.value)}
                           required />
                </div>
                <div>
                    <label>전화번호 : </label>
                    <input type="text"
                           id="member_phone"
                           value={member_phone}
                           onChange={(e) => setMember_phone(e.target.value)}
                           required />
                </div>
                <div>
                    <label>이메일 : </label>
                    <input type="text"
                           id="member_email"
                           value={member_email}
                           onChange={(e) => setMember_email(e.target.value)}
                           required />
                </div>
                <div>
                    <label>우편번호 : </label>
                    <input type="text"
                           id="member_post"
                           value={member_post}
                           onChange={(e) => setMember_post(e.target.value)}
                           required />
                </div>
                <div>
                    <label>주소 : </label>
                    <input type="text"
                           id="member_address"
                           value={member_address}
                           onChange={(e) => setMember_address(e.target.value)}
                           required />
                </div>
                <div>
                    <label>상세주소 : </label>
                    <input type="text"
                           id="member_address_detail"
                           value={member_address_detail}
                           onChange={(e) => setMember_address_detail(e.target.value)}
                           required />
                </div>
                <div>
                    <label>좋아하는 팀 : </label>
                    <input type="text"
                           id="member_team_code"
                           value={member_team_code}
                           onChange={(e) => setMember_team_code(e.target.value)}
                           required />
                </div>
                <div>
                    <label>이미지 : </label>
                    <input type="text"
                           id="member_img"
                           value={member_img}
                           onChange={(e) => setMember_img(e.target.value)} />
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