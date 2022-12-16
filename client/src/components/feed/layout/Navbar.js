import React, { useState } from "react";
import "../../css/reset.css";
import "../../css/navbar.css";
import { NavLink } from "react-router-dom";
import petssLogo from "../../../images/petss_logo.png";
import Modal from "react-modal";
import AddFeed from "../pages/AddFeed";
import { addFeedStyle, searchStyle } from "../../css/modalStyles";
import Search from "../pages/Search";
import { useUserState } from "../../../ContextProvider";
import axios from "axios";

const Navbar = ({ setIsLogined }) => {
  const [userState] = useUserState();
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const [isOpenAddFeed, setIsOpenAddFeed] = useState(false);

  const logout = async() => {
    console.log("1");
    await axios({
      method: "GET",
      url: `api/auth/logout`,
      withCredentials: true,
    })
    .then((result) => {
      sessionStorage.setItem("isLogin", "false");
      setIsLogined("false");
      console.log("2");
    })
    .catch((err) => {
        console.log(err);
        console.log("3");
    });



  };

  return userState ? (
    <div className="navbar">
      <h1>
        <img src={petssLogo} alt="logoImage" className="logoImage" />
      </h1>

      <hr />
      <div className="propileBox">
        <span className="propileImage">
          <img src={userState.info.image} alt="세션 로그인 유저 프로필" />
        </span>
        <span className="nickname">{userState.info.nick}</span>
      </div>
      <hr />
      <nav>
        <ul className="navbarList">
          <li>
            <NavLink to="/">홈</NavLink>
          </li>
          <li onClick={() => setSearchIsOpen(true)}>검색</li>
          <Modal
            isOpen={searchIsOpen}
            onRequestClose={() => setSearchIsOpen(false)}
            ariaHideApp={false}
            style={searchStyle}
          >
            <Search />
          </Modal>
          {/*  <button className="openBtn" onClick={onOpenModal}>Modal open</button> 
                  {modalOn? <Modal/>: ''} */}
          <li>
            <NavLink to="/myFeed">My Feed</NavLink>
          </li>
          <li onClick={() => setIsOpenAddFeed(true)}>Feed 추가</li>
          <Modal
            isOpen={isOpenAddFeed}
            onRequestClose={() => setIsOpenAddFeed(false)}
            ariaHideApp={false}
            style={addFeedStyle}
          >
            <AddFeed setIsOpenAddFeed={setIsOpenAddFeed} />
          </Modal>
          <li>알림</li>
          <li>
            <NavLink to="/edit">설정</NavLink>
          </li>
          <li onClick={() => logout()}>로그아웃</li>
        </ul>
      </nav>
    </div>
  ) : (
    ""
  );
};

export default Navbar;
