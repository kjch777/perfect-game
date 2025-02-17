import React from 'react';
import '../../css/BoardTeamIntroduce.css';

function BoardTeamIntroduce() {   

  return (
    <>
        <div className='board-main-header'>
            <h1 className='board-main-h2'>구단별 소개</h1>
            <hr className='board-main-hr'/>
        </div>
        <div className='board-team-container'>
            <ul className='board-team-link-list-ul'>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://www.lgtwins.com/service/html.ncd?view=/pc_twins/twins_main/twins_main"
                    target="_blank">
                        <img src='/images/team/lg_twins.png' alt='lg-twins'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://www.ktwiz.co.kr/"
                    target="_blank">
                        <img src='/images/team/kt_wiz.png' alt='kt-wiz'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://www.ssglanders.com/main"
                    target="_blank">
                        <img src='/images/team/ssg_landers.png' alt='ssg-landers'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://www.ncdinos.com/"
                    target="_blank">
                        <img src='/images/team/nc_dinos.png' alt='nc-dinos'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://www.doosanbears.com/"
                    target="_blank">
                        <img src='/images/team/doosan_bears.png' alt='doosan-bears'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://tigers.co.kr/"
                    target="_blank">
                        <img src='/images/team/kia_tigers.png' alt='kia-tigers'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://www.giantsclub.com/html/"
                    target="_blank">
                        <img src='/images/team/lotte_giants.png' alt='lotte-giants'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://www.samsunglions.com/index.asp"
                    target="_blank">
                        <img src='/images/team/samsung_lions.png' alt='samsung-lions'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://www.hanwhaeagles.co.kr/index.do"
                    target="_blank">
                        <img src='/images/team/hanwha_eagles.png' alt='hanwha-eagles'/>
                    </a>
                </li>
                <li className='board-team-link-list-li'>
                    <a className='board-team-link-list-a'
                    href="https://heroesbaseball.co.kr/index.do"
                    target="_blank">
                        <img src='/images/team/kiwoom_heroes.png' alt='kiwoom-heroes'/>
                    </a>
                </li>
            </ul>
        </div>
    </>

  );
}

export default BoardTeamIntroduce;