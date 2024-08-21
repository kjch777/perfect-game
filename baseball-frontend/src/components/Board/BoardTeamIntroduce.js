import React, { useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom";
import '../css/BoardTeamIntroduce.css';
import LoginContext from '../../components/Login/LoginContext';
import Sidebar from '../Layout/Board/Sidebar';

function BoardTeamIntroduce() {
  const { loginMember, setLoginMember } = useContext(LoginContext);    

  return (
    <div className='board-team-container'>
    <ul className='board-team-link-list-ul'>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://www.lgtwins.com/service/html.ncd?view=/pc_twins/twins_main/twins_main">
                <img src='/images/lg_twins.png' alt='lg-twins'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://www.ktwiz.co.kr/">
                <img src='/images/kt_wiz.png' alt='kt-wiz'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://www.ssglanders.com/main">
                <img src='/images/ssg_landers.png' alt='ssg-landers'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://www.ncdinos.com/">
                <img src='/images/nc_dinos.png' alt='nc-dinos'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://www.doosanbears.com/">
                <img src='/images/doosan_bears.png' alt='doosan-bears'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://tigers.co.kr/">
                <img src='/images/kia_tigers.png' alt='kia-tigers'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://www.giantsclub.com/html/">
                <img src='/images/lotte_giants.png' alt='lotte-giants'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://www.samsunglions.com/index.asp">
                <img src='/images/samsung_lions.png' alt='samsung-lions'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://www.hanwhaeagles.co.kr/index.do">
                <img src='/images/hanwha_eagles.png' alt='hanwha-eagles'/>
            </a>
        </li>
        <li className='board-team-link-list-li'>
            <a className='board-team-link-list-a' href="https://heroesbaseball.co.kr/index.do">
                <img src='/images/kiwoom_heroes.png' alt='kiwoom-heroes'/>
            </a>
        </li>
    </ul>
</div>

  );
}

export default BoardTeamIntroduce;