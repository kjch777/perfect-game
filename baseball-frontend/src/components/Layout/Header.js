import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return ( 
        <header>
            <div id="menu">
                <ul>
                    <li>
                        <Link to="#">PERFECT GAME</Link>
                    </li>
                    <li>
                        <Link to="#">야구장</Link>
                        <ul>
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
                        <ul>
                            <li><Link to="#">공지사항</Link></li>
                            <li><Link to="#">야구 지식</Link></li>
                            <li><Link to="#">구장 소개</Link></li>
                            <li><Link to="#">구단 소개</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#">마이페이지</Link>
                        <ul>
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