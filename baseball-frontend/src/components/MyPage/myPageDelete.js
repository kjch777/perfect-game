import React, { useState, useContext, useEffect } from "react";
import LoginContext from "../../components/Login/LoginContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../css/MypageDelete.css";

function MyPageDelete() {
  const { loginMember, setLoginMember } = useContext(LoginContext);
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginMember) {
      alert("로그인 하세요.");
      navigate('/login');
    }
  }, [loginMember, navigate]);

  const handleDelete = async () => {
    if (!isChecked) {
      setError("약관에 동의하셔야 합니다.");
      return;
    }
    if (password !== loginMember.memberPw) {
      setError("입력한 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.delete(`/mypage/${loginMember.memberId}`, {
        params: { memberPw: password },
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.data.includes("회원 탈퇴가 성공적으로 처리되었습니다.")) {
        alert("회원 탈퇴가 완료되었습니다.");
        setLoginMember(null);
        navigate('/');
      } else {
        setError(response.data || "비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("회원 탈퇴 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="mypage-delete-container">
      <div className="mypage-icon">
        <img src="../../images/mypage-user.png" alt="User Icon" />
      </div>
      <div className="mypage-delete-card">
      <h2>회원 탈퇴</h2>
      <div>
        <label className="delete-label">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mypage-delete-input"
        />
      </div>
      <div className="mypage-delete-terms">
        <textarea
          className="mypage-delete-textarea"
          disabled
          value="
          회원은 홈페이지에 언제든지 탈퇴를 요청할 수 있으며, 이 경우 홈페이지는 즉시 회원탈퇴를 처리를 합니다.
          
          회원이 다음 각 호의 사유에 해당하는 경우, 홈페이지는 회원자격을 상실시킬 수 있습니다.

          1) 가입 신청시 허위 내용을 기재한 경우
          2) 홈페이지를 통해 구입한 보험상품·서비스 등의 대금, 기타 홈페이지 이용에 관련하여 회원이 부담하는 채무를 기일 내에 지급하지 않는 경우
          3) 다른 사람의 홈페이지 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우
          4) 홈페이지를 이용하여 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
          홈페이지가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다.
          이 경우 회원에게 이를 통지하고, 회원 등록 말소 전에 소명할 기회를 부여합니다. "
        />
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label>위 약관에 동의합니다.</label>
        </div>
      </div>
      {error && <div className="mypage-delete-error">{error}</div>}
      <button onClick={handleDelete} className="mypage-delete-button">
        탈퇴
      </button>
      </div>
    </div>
  );
}

export default MyPageDelete;
