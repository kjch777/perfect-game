import React from 'react';
import {Link} from "react-router-dom";
import '../css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className='sidebar-container'>
            <Link to="/board" className='sidebar-board-link'>게시판</Link>
            <hr className='sidebar-hr'/>
            <ul className='sidebar-link-list-ul'>
                <li className='sidebar-link-list-li'><Link to="#">공지사항</Link></li>
                <li className='sidebar-link-list-li'><Link to="/board/team">구단별 소개</Link></li>
                <li className='sidebar-link-list-li'><Link to="/board/guestbook">방명록</Link></li>
                <li className='sidebar-link-list-li'><Link to="#">규정, 자료실</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;