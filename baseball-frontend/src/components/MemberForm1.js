import React, {useState} from "react";

const MemberForm1 = ({addMember}) => {
    const [member_id, setMember_id] = useState('');
    const [member_name, setMember_name] = useState('');
    const [member_email, setMember_email] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addMember({member_id, member_name, member_email});
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
                    <label>이름 : </label>
                    <input type="text"
                           id="member_name"
                           value={member_name}
                           onChange={(e) => setMember_name(e.target.value)}
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
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}
export default MemberForm1;