import React from 'react'
import "../css/reset.css";
import "../css/navbar.css";
import { Link, NavLink } from 'react-router-dom';
import petssLogo from "../../../images/petss_logo.png"


const Navbar = () => {
  return (        
    <div>
      <h1>
          <img src={petssLogo} alt="logoImage" className='logoImage'/>
      </h1>

      <hr/>
      <div className="propileBox">
          <span className="propileImage"></span>
          <span className='nickname'>츄츄와 예니</span>
      </div>
      <hr/>
      <nav>
        <ul>
            <li><NavLink to="/">홈</NavLink></li>
            <li>검색</li>
            <li><NavLink to="myFeed">My Feed</NavLink></li>
            <li><NavLink to="/addFeed">Feed 추가</NavLink></li>
            <li>알림</li>
            <li>설정</li>
            <li><NavLink to="/logout">로그아웃</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar