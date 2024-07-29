import React, {useContext, useState} from "react";
import LoginContext from "./LoginContext";

const Login = () => {
    //App.js에서 작성한 Context와
    //LoginMember와 오른쪽에 작성한 LoginContext에 키가 일치하는 값을 가져와 대입
    //만약에 로그인한 값이 없으면 로그인 화면으로 이동
    const {loginMember, setLoginMember} = useContext(LoginContext);

    /* 아이디, 비밀번호 상태 변수 */
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    //로그인버튼 함수 만들기
    const 로그인버튼 = () => {
        fetch('/login', {
            method: "POST", 
            headers: {"Content-Type" : "application/json",
                            //사용자 -> 서버에 로그인한 정보가 일치하는게 있는지 확인
                      "Accept" : "application/json"}, 
                            //서버 -> 사용자한테 사용자가 작성한 정보가 존재하는지에 대한 존재여부 전달
            body: JSON.stringify({id : id, pw : pw})
                //본문으로 id, pw 작성된 내용 전달
        })
            .then (response => response.json())
            .then (map => {
                console.log(map);
                
                //로그인 실패시
                if (map.loginMember === null) {
                    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                    return;
                }

                //로그인 성공시
                setLoginMember(map.loginMember);
                    //App.js에 로그인 성공한 정보가 올라감.
                    //App.js 로그인 정보를 다른 js에 전달

                //id, pw값 모두 지우기
                setId('');
                setPw('');
                alert('로그인 성공~!');
            })
    }

    /*로그아웃 이벤트 핸들러*/
    const 로그아웃버튼 = () => {
      setLoginMember(null);
      alert('로그아웃 되었습니다.')
    }

  return (
    <div className="login-container">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>
              <input
                type="text"
                onChange={(e) => setId(e.target.value)}
                value={id}
              />
            </td>
          </tr>
          <tr>
            <th>PW</th>
            <td>
                <input type="password" onChange={e => setPw(e.target.value)} value={pw} />
            </td>
            <td>
                <button onClick={로그인버튼}>로그인</button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* loginMember가 null이 아닌 경우 로그아웃 버튼 보이게 하기 */}
      {loginMember && (
        <button onClick={로그아웃버튼}>로그아웃</button>
      )}
    </div>
  );
};
export default Login;