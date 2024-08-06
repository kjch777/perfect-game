import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
//import MemberTable from './MemberTable';
//import NaverLogin from '../../NaverLogin';

//select, insert component 추가 작성
function LoginApp() {
  const [members, setMembers] = useState([]);

  const addMember = async (member) => {
    const res = await axios.post('/members', member);
    setMembers([...members], res.data);
  }

  return (
    <div className="App">
      <MemberForm addMember={addMember} />
    </div>
  );
}

export default LoginApp;
