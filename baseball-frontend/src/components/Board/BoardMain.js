import React, { useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom";
import '../css/BoardMain.css';
import LoginContext from '../../components/Login/LoginContext';
import Sidebar from '../Layout/Board/Sidebar';

function BoardMain() {
  const { loginMember, setLoginMember } = useContext(LoginContext);    

  return (
    <div className='board-main-container'>
      <Sidebar/>
      <div className='board-main-link-container'>
        <h1>게시판</h1>
        <hr className='board-main-hr'/>
        <ul className='board-main-link-list-ul'>
            <li className='board-main-link-list-li'><Link to="#">공지사항</Link></li>
            <li className='board-main-link-list-li'><Link to="#">구단별 소개</Link></li>
            <li className='board-main-link-list-li'><Link to="#">자주하는 질문</Link></li>
            <li className='board-main-link-list-li'><Link to="#">규정, 자료실</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default BoardMain;