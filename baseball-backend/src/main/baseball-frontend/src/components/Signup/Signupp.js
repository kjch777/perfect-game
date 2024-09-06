import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SignupForm from './SignupForm';

function Signupp() {
  const [members, setMembers] = useState([]);

  const addMember = async (member) => {
    const res = await axios.post('/members', member);
    setMembers([...members], res.data);
  }

  return (
    <div className="App">
      <SignupForm addMember={addMember} />
    </div>
  );
}

export default Signupp;
