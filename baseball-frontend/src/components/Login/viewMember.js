import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import MemberTable from './MemberTable';
import NaverLogin from '../../NaverLogin';

//select, insert component 추가 작성
function viewMember() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    findAllMember();
  }, []);


  const findAllMember = async () => {
    const res = await axios.get("/members");
    setMembers(res.data);
  };

  const addMember = async (member) => {
    const res = await axios.post('/members', member);
    setMembers([...members], res.data);
  }

  const deleteMember = async (memberNo) => {
    await axios.delete(`/members?id=${memberNo}`);
    setMembers(members.filter(member => member.memberNo !== memberNo));
  }

  return (
    <div className="App">
      <h1>Perfect Game 회원가입</h1>
      <MemberForm addMember={addMember} />
      <NaverLogin />
      <MemberTable members={members} deleteMember={deleteMember} />
    </div>
  );
}

export default viewMember;