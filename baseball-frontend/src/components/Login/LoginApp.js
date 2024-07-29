import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MemberForm1 from '../MemberForm1';
import MemberTable1 from '../MemberTable1';
import NaverLogin from '../../NaverLogin';

//select, insert component 추가 작성
function LoginApp() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    findAllMember();
  }, []);


  const findAllMember = async () => {
    const res = await axios.get("/members");
    setMembers(res.data);
  };

  const addMember = async (member2) => {
    const res = await axios.post('/members', member2);
    setMembers([...members], res.data);
  }

  const deleteMember = async (memberNo) => {
    await axios.delete(`/members?id=${memberNo}`);
    setMembers(members.filter(member => member.memberNo !== memberNo));
  }

  return (
    <div className="App">
      <h1>Perfect Game 회원가입</h1>
      <MemberForm1 addMember={addMember} />
      <NaverLogin />
      <MemberTable1 members={members} deleteMember={deleteMember} />
    </div>
  );
}

export default LoginApp;