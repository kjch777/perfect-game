import React from 'react';
import { Routes, Route } from "react-router-dom";
import '../css/BoardMain.css';
import Sidebar from '../Layout/Board/Sidebar';
import BoardTeamIntroduce from './BoardTeamIntroduce';
import Board0820 from './Board0820';

function BoardMain() {

  return (
    <div className='board-main-container'>
      <Sidebar/>
      <div className='board-main-link-container'>
        <h1>게시판</h1>
        <hr className='board-main-hr'/>
        <Routes>
          <Route path="team" element={<BoardTeamIntroduce/>}></Route>
          <Route path="ex" element={<Board0820/>}></Route>
          {/* 다른 하위 경로들을 여기에 추가 */}
        </Routes>
      </div>
    </div>
  );
}

export default BoardMain;
