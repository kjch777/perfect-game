import React, { useState, useEffect, useContext } from "react";
import "../../css/MyPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginContext from '../../components/Login/LoginContext';

function MyPage() {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMember = localStorage.getItem('loginMember');
    if (storedMember) {
      setLoginMember(JSON.parse(storedMember));
    }
  }, [setLoginMember]);

  useEffect(() => {
    if (!loginMember) {
      return;
    }

    axios.get(`/mypage/${loginMember.memberId}`)
      .then((response) => {
        setMember(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch member data:", error);
        setError("Failed to load member data. Please try again later.");
        setLoading(false);
      });
  }, [loginMember]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!member) {
    return <div>No member data available</div>;
  }

  const 수정버튼 = () => {
    navigate(`/mypage/edit`);
  };

  return (
    <div className="mypage-container">
      <div className="mypage-icon">
        <img src="./images/mypage-user.png" alt="User Icon" />
      </div>
      <div className="mypage-card">
      <h2>
          <strong>내 정보</strong>
        </h2>
        <hr />
        <div className="mypage-info">
          <p><strong>이름:</strong> {member.memberName}</p>
          <p><strong>아이디:</strong> {member.memberId}</p>
          <p><strong>전화번호:</strong> {member.memberPhone}</p>
          <p><strong>이메일:</strong> {member.memberEmail}</p>
          <p><strong>우편번호:</strong>{member.memberPost}</p>
          <p><strong>주소:</strong> {member.memberAddress} {member.memberAddressDetail}</p>
          <p><strong>선호하는 팀:</strong> {member.memberTeamCode}</p>
        </div>
        <button className="mypage-edit-btn" onClick={수정버튼}>수정</button>
      </div>
    </div>
  );
}

export default MyPage;
