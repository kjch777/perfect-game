import './App.css';
import React, {useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import FoodMain from "./components/Food/foodMain";
import FoodMapLG from "./components/Food/foodMapLG";
import FoodMapKIWOOM from "./components/Food/foodMapKIWOOM";
import FoodMapSSG from "./components/Food/foodMapSSG";
import FoodMapKIA from "./components/Food/foodMapKIA";
import FoodDetail from "./components/Food/foodDetail";
import FoodComment from "./components/Food/foodComment";
import MyPage from './components/MyPage/myPage';
import MyPageEdit from './components/MyPage/myPageEdit';
import MyPageDelete from './components/MyPage/myPageDelete';
import Signup from './components/Signup/Signupp';
import Main from './components/Layout/Main';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginContext from './components/Login/LoginContext';
import Login from './components/Login/Login';

function App() {
  const [loginMember, setLoginMember] = useState(null);

  useEffect(() => {
    const savedMember = localStorage.getItem("loginMember");
    if (savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  }, []);

  useEffect(() => {
    if (loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  }, [loginMember]);

  return (
    <LoginContext.Provider value={{ loginMember, setLoginMember }}>
    <div>
      <Header/>
      <div id="main-content">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/members/signup" element={<Signup/>}></Route>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/foodmain" element={<FoodMain />} />
        <Route path="/foodmapLG" element={<FoodMapLG />} />
        <Route path="/foodmapSSG" element={<FoodMapSSG />} />
        <Route path="/foodmapKIWOOM" element={<FoodMapKIWOOM />} />
        <Route path="/foodmapKIA" element={<FoodMapKIA />} />
        <Route path="/fooddetail/:foodId" element={<FoodDetail />} />
        <Route path="/foodComment" element={<FoodComment />} />
        <Route path='/mypage/delete' element={<MyPageDelete />} />
        </Routes>
      </div>
      <Footer/>
    </div>
    </LoginContext.Provider>
  );
}

export default App;
