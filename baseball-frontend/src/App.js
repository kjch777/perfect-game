import './App.css';
import React, {useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import Main from './components/Layout/Main';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginContext from './components/Login/LoginContext';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signupp';
import Board from './components/Board/Board';

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
          <Route path="/" element={<Main/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/members/signup" element={<Signup/>}></Route>
          <Route path="/board" element={<Board/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
    </LoginContext.Provider>
  );
}

export default App;