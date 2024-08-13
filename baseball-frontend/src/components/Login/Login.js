import React, { useContext, useState } from "react";
import LoginContext from '../../components/Login/LoginContext';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  
  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');

  const navigate = useNavigate();

  const handleLogin = (event) => { 
    event.preventDefault();

    fetch('http://localhost:9090/members/login', {
      method : "POST",
      headers : {"Content-Type" : "application/json",
                 "Accept" : "application/json" },
      body : JSON.stringify({memberId : memberId, memberPw : memberPw})
    })
    .then(resp => resp.json())
    .then(map => {
      console.log(map);

      if (map.loginMember === null) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다');
        return;
      }

      setLoginMember(map.loginMember);

      setMemberId('');
      setMemberPw('');

      navigate('/');
    })
  }

  /*
  const logout = () => { setLoginMember(null); }
  <button onClick={logout}>로그아웃</button>
  */

  return (
    <div className="login-container">
      <h1>환영합니다!</h1>
      <form className="login-input">
        <div>
          <p><strong>아이디</strong></p>
          <input type="text"
                    onChange={e => setMemberId(e.target.value)}
                    value={memberId}
                    placeholder="아이디를 입력하세요"
                    required />
        </div>
        <div>
        <p><strong>비밀번호</strong></p>
          <input type="password"
                    onChange={e => setMemberPw(e.target.value)}
                    value={memberPw}
                    placeholder="비밀번호를 입력하세요"
                    required />
        </div>
        <div className="button-container">
          <button onClick={handleLogin} >Login</button>
        </div>
      </form>
    </div>
  );
  
};

export default Login;
