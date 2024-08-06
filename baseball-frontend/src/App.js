import './App.css';
import React, {useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Main from './components/Layout/Main';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginContext from './components/Login/LoginContext';
import { LoginProvider } from './components/Login/LoginContext';
import Login from './components/Login/Login';
import Signup from './components/Login/signup';
import MemberTable from './components/Login/MemberTable';

function App() {
  return (
    <LoginProvider>
    <div>
      <Header/>
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/members/signup" element={<Signup/>}></Route>
          <Route path="/members/membertable" element={<MemberTable/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
    </LoginProvider>
  );
}

export default App;