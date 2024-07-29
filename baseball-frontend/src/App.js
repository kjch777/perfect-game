import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import MemberForm from './components/MemberForm';
import MemberTable from './components/MemberTable';
import Login from './Login';

//select, insert component 추가 작성
function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    findAllMember();
  }, [members]);


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
      <Login/>
      <MemberTable members={members} deleteMember={deleteMember} />
    </div>
  );
}

export default App;