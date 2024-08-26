import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoginContext from "../Login/LoginContext";

function NaverSignup() {
  const [userInfo, setUserInfo] = useState(null);

  const [newId, setNewId] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const {loginMember} = useContext(LoginContext);

  useEffect(() => {
    const a = new URLSearchParams(location.search);
    const accessToken = a.get("access_token");
    console.log("토큰 확인 : " + accessToken);
    if(accessToken) {
        axios.get(`/api/signup/naver?access_token=${accessToken}`)
        .then(response => {
          setUserInfo(response.data);
          setLoading(false);
        })
        .catch((err) => {
          alert("정보를 가져오지 못했습니다.");
        });
    }
  }, [location.search]);

  if(loading) {
    return <div>데이터 정보 가져오는 중...</div>
  }

  const 회원가입기능 = () => {
    if (!newId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    axios.post('http://localhost:9090/NaverAPI/register', {
      id : userInfo.response.id,
      email : userInfo.response.email,
      nickname : userInfo.response.nickname,
      name : userInfo.response.name,
      gender : userInfo.response.gender,
      image : userInfo.response.profile_image,
      mobile : userInfo.response.mobile,
      newId : newId,
      password : password
    })
    .then(response => {
      console.log(response.data);
      alert("회원가입이 완료되었습니다.");
    })
    .catch(err => {
      console.error('개발자가 에러 확인하는 공간 : ', err);
      alert("회원가입에 실패하였습니다.");
    })
  }

  return (
    <>
      <h1>유저정보</h1>
      {userInfo ? (
        <div>
          <div>
            <label>아이디</label>
            <input type="text" value={userInfo.response.id} disabled />
          </div>
          <div>
            <label>이메일</label>
            <input type="email" value={userInfo.response.email} disabled/>
          </div>
          <div>
            <label>이름</label>
            <input type="text" value={userInfo.response.name} disabled/>
          </div>
          <div>
            <label>핸드폰 번호</label>
            <input type="text" value={userInfo.response.mobile} disabled/>
          </div>
          <div>
            <label>프로필 이미지</label>
            <img src={userInfo.response.profile_image} disabled/>
          </div>
        </div>
      ) : (
        <p>유저를 찾을 수 없습니다.</p>
      )}

      <div>
        <h2>회원가입에 필요한 아이디 및 비밀번호 작성하기</h2>
        <div>
          <label>아이디</label>
          <input type="text" value={newId} onChange={(e) => setNewId(e.target.value)}/>
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button onClick={회원가입기능}>회원가입하기</button>
      </div>
    </>
  );
}

export default NaverSignup;