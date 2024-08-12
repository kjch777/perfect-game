import React, { useContext, useState } from "react";
import LoginContext from '../../components/Login/LoginContext';
import Main from "../Layout/Main";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  
  const [memberId, serMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => { 

    fetch('http://localhost:9090/members/login', {
      method : "POST",
      headers : {"Content-Type" : "application/json",
                 "Accept" : "application/json" },
      body : JSON.stringify({memberId : memberId, memberPw : memberPw})
    })
    .then(resp => resp.json())
    .then(map => {
      console.log(map);

      if(map.loginMember === null){
        alert('아이디 또는 비밀번호가 일치하지 않습니다');
        return;
      }

      setLoginMember(map.loginMember);

      serMemberId('');
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
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>
              <input type="text"
                     onChange={e => serMemberId(e.target.value)}
                     value={memberId}
                     placeholder="아이디를 입력하세요"
                     required />
            </td>
          </tr>

          <tr>
            <th>PW</th>
            <td>
              <input type="password"
                     onChange={e => setMemberPw(e.target.value)}
                     value={memberPw}
                     placeholder="비밀번호를 입력하세요"
                     required />
            </td>
            <td>
              <button onClick={handleLogin} >Login</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  
};

export default Login;
