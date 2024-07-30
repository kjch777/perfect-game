import React from "react";
import {Link} from "react-router-dom";
import '../css/Header.css'

const Header = () => {
    return ( 
        <header>
            <div id="menu">
                <ul id="main-banner">
                    <li>
                        <Link to="/">PERFECT GAME</Link>
                    </li>
                </ul>
                <ul id="link-banner">
                    <li>
                        <Link to="#">야구장</Link>
                        <ul id="ul-num-1">
                            <li><Link to="#">야구장 날씨</Link></li>
                            <li><Link to="#">야구장 먹거리</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#">예매</Link>
                    </li>
                    <li>
                        <Link to="#">굿즈샵</Link>
                    </li>
                    <li>
                        <Link to="#">게시판</Link>
                        <ul id="ul-num-2">
                            <li><Link to="#">공지사항</Link></li>
                            <li><Link to="#">구단별 소개</Link></li>
                            <li><Link to="#">자주하는 질문</Link></li>
                            <li><Link to="#">규정, 자료실</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#">마이페이지</Link>
                        <ul id="ul-num-3">
                            <li><Link to="#">내 정보</Link></li>
                            <li><Link to="#">예매 내역</Link></li>
                            <li><Link to="#">주문 내역</Link></li>
                            <li><Link to="#">회원 탈퇴</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    )
}
export default Header;