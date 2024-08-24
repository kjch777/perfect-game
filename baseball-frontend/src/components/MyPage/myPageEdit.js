import React, { useState, useEffect, useContext } from "react";
import "../../css/MyPageEdit.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../components/Login/LoginContext";

function MyPageEdit() {
  const { loginMember } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    memberName: "",
    memberPhone: "",
    memberEmail: "",
    memberTeamCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (loginMember) {
      axios
        .get(`http://localhost:9090/mypage/${loginMember.memberId}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch member data:", error);
        });
    }
  }, [loginMember]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:9090/mypage`, formData)
      .then((response) => {
        alert("회원 정보가 성공적으로 수정되었습니다.");
        navigate("/mypage");
      })
      .catch((error) => {
        console.error("Failed to update member data:", error);
        alert("회원 정보 수정에 실패했습니다.");
      });
  };

  const 취소버튼 = () => {
    navigate("/mypage");
  };

  return (
    <div className="mypage-container">
      <div className="mypage-icon">
        <img src="../../images/mypage-user.png" alt="User Icon" />
      </div>
      <form onSubmit={handleSubmit} className="mypage-card">
        <h2>
          <strong>회원 정보 수정</strong>
        </h2>
        <hr />
        <br />
        <div className="form-group">
          <label className="mypage-label">
            <strong>이름 : </strong>
          </label>
          <input
            type="text"
            name="memberName"
            value={formData.memberName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="mypage-label">
            <strong>전화번호 : </strong>
          </label>
          <input
            type="text"
            name="memberPhone"
            value={formData.memberPhone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="mypage-label">
            <strong>이메일 : </strong>
          </label>
          <input
            type="email"
            name="memberEmail"
            value={formData.memberEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="mypage-label">
            <strong>선호하는 팀 : </strong>
          </label>
          <select
            type="text"
            name="memberTeamCode"
            value={formData.memberTeamCode}
            onChange={handleInputChange}
          >
            <option value="">응원하는 팀을 선택하세요</option>
            <option disabled>----------------------------</option>
            <option value="LG 트윈스">LG 트윈스</option>
            <option value="KT wiz">KT wiz</option>
            <option value="SSG 랜더스">SSG 랜더스</option>
            <option value="NC 다이노스">NC 다이노스</option>
            <option value="두산 베어스">두산 베어스</option>
            <option value="KIA 타이거즈">KIA 타이거즈</option>
            <option value="롯데 자이언츠">롯데 자이언츠</option>
            <option value="삼성 라이온즈">삼성 라이온즈</option>
            <option value="한화 이글스">한화 이글스</option>
            <option value="키움 히어로즈">키움 히어로즈</option>
          </select>
        </div>
        <div className="button-group">
          <button type="button" className="mypage-edit-btn" onClick={취소버튼}>
            취소
          </button>
          <button type="submit" className="mypage-edit-btn">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyPageEdit;
