import React, {useState} from 'react';
import LoginContext from './components/LoginContext';
import Signup from './components/SignUp';
import Login from './components/Login';
import TodoList from './components/TodoList';
import './App.css';

/* 현재 App.js는 제일 위에 있는 컴포넌트 = 객체 */
function App() {
  //회원가입 창 보이기 / 숨기기
  const [signUpView, setSignUpView] = useState(false);

  //로그인한 회원 정보 저장
  const [loginMember, setLoginMember] = useState(null);

  return (
    <LoginContext.Provider value={ {loginMember, setLoginMember} }>
                       {/* value={ {} } : 
                           value={} => 하나의 값만 작성
                           value={ {} } => 두 가지 이상의 값을 작성 가능*/}
                                {/* loginMember : 처음에 로그인 안 된 초기값을 가지고 있음 */}
                                             {/* setLoginMember : 로그인 한 다음에 
                                                                  로그인 한 정보를 가지고 있음 */}
      <button onClick={() => {setSignUpView(!signUpView)}}>
        {signUpView ? ('회원 가입 닫기') : ('회원 가입 열기')}
      </button>

      {/* 회원가입 화면 */}
      <div className="signup-wrapper">
        {/* signUpview가 true일 경우에만 실행되는 공강 = true여야 눈에 보여짐 */}
        {/* 조건식 && (true일 경우 실행) */}
        {signUpView === true && (<Signup/>)}
      </div>

      <h1>Todo List</h1>
      {/* 로그인을 해야 TodoList 확인 가능 */}
      <Login/>
      <hr/>
      {/* 로그인이 되었을 때 로그인한 회원의 TodoList 출력 */}
      {loginMember && (
        /* TodoList.js import하기 */
        <TodoList/>
      )}

    </LoginContext.Provider>
  );
}
export default App;