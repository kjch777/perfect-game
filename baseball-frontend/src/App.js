import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import MemberForm from './components/MemberForm';
import MemberTable from './components/MemberTable';

//select, insert component 추가 작성
function App() {
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

  return (
    <div className="App">
      <h1>Perfect Game 회원가입</h1>
      <MemberForm addMember={addMember} />
      <MemberTable members={members} />
    </div>
  );
}

export default App;