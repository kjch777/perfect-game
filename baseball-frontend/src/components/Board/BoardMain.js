import React, { useState, useEffect, useContext } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import '../css/BoardMain.css';
import LoginContext from '../../components/Login/LoginContext';
import Sidebar from '../Layout/Board/Sidebar';
import BoardTeamIntroduce from './BoardTeamIntroduce';
import BoardMainHeader from './BoardMainHeader';

function BoardMain() {
  const { loginMember, setLoginMember } = useContext(LoginContext);    

  return (
    <div className='board-main-container'>
      <Sidebar/>
      <div className='board-main-link-container'>
        <BoardMainHeader/>
        <Routes>
          <Route path="team" element={<BoardTeamIntroduce/>}></Route>
          {/* 다른 하위 경로들을 여기에 추가 */}
        </Routes>
      </div>
    </div>
  );
}

export default BoardMain;
