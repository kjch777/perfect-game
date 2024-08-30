import React from 'react';
import { Routes, Route } from "react-router-dom";
import '../../css/BoardMain.css';
import Sidebar from './Sidebar';
import BoardTeamIntroduce from './BoardTeamIntroduce';
import BoardGuestbook from './BoardGuestbook';

function BoardMain() {

  return (
    <div className='board-main-container'>
      <Sidebar/>
      <div className='board-main-link-container'>
        <Routes>
          <Route path="team" element={<BoardTeamIntroduce/>}></Route>
          <Route path="guestbook" element={<BoardGuestbook/>}></Route>
          {/* 다른 하위 경로들을 여기에 추가 */}
        </Routes>
      </div>
    </div>
  );
}

export default BoardMain;
