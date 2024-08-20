import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../css/Header.css'
import LoginContext from '../../components/Login/LoginContext';

const Header = () => {
    const { loginMember, setLoginMember } = useContext(LoginContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoginMember(null);
        localStorage.removeItem('loginMember');
        
        navigate('/');
      };

    return ( 
        <header>
            <div id="login-signup">
                <ul id="login-banner">
                    {loginMember ? (
                        <li>
                            <span>환영합니다, <strong>{loginMember.memberName}</strong> 님</span>
                            <a onClick={handleLogout}>로그아웃</a>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">로그인</Link>
                            </li>
                            <li>
                                <Link to="/members/signup">회원가입</Link>
                            </li>
                        </>
                    )
                    }

                </ul>
            </div>
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
                        <Link to="/board">게시판</Link>
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