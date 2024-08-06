import React from "react";
import {Link} from "react-router-dom";
import '../css/Footer.css';


const Footer = () => {
    return (
        <footer>
            <div className="footer-link">
                <div className="left">
                    <ul id="link-banner">
                        <li><Link to="#">야구장</Link></li>
                        <li><Link to="#">예매</Link></li>
                        <li><Link to="#">굿즈샵</Link></li>
                        <li><Link to="#">게시판</Link></li>
                        <li><Link to="#">마이페이지</Link></li>
                    </ul>
                </div>
                <div className="right">
                    <ul>
                        <li>
                            <a href="https://github.com/kjch777/perfect-game">GitHub</a>
                        </li>
                        <li>
                            <a href="https://www.notion.so/PERFECT-GAME-b87878619aba40b3be246ebbf5a200e0?pvs=4">Notion</a>
                        </li>
                        <li>
                            <a href="https://www.figma.com/design/djcUGi2McsPqLb3Mo14uVJ/Untitled?node-id=0-1&t=bFKlZo3hbFUNbKer-0">Figma</a>
                        </li>
                        <li>
                            <a href="#">Instagram</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr/>
            <div className="detail">
                <div className="detail-content">
                    (주)PERFECT GAME | 서울 강남구 테헤란로14길 6 | 1544-9970<br/>
                    Copyright ⓒ PERFECT GAME, All Rights Reserved.
                </div>
                <div className="image">
                    {/* 이미지 */}
                 </div>
            </div>

      </footer>
    );
}
export default Footer;