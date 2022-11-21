import React, { useState } from "react";
import "../../css/reset.css";
import "../../css/navbar.css";
import { Link, NavLink } from "react-router-dom";
import petssLogo from "../../../images/petss_logo.png";
import Modal from "react-modal";
import AddFeed from "../pages/AddFeed";
import modalStyles from "../../css/modalStyles";

const Navbar = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  // const [modalOn, setModalOn] = React.useState(false);
  // const onOpenModal = () => {
  // setModalOn(!modalOn);
  // }

  const [isOpenAddFeed, setIsOpenAddFeed] = useState(false);

  return (
    <div className="navbar">
      <h1>
        <img src={petssLogo} alt="logoImage" className="logoImage" />
      </h1>

      <hr />
      <div className="propileBox">
        <span className="propileImage"></span>
        <span className="nickname">츄츄와 예니</span>
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
            style={searchStyles}
          >
            <input type="text" name="search" className="searchInput" />
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
            style={modalStyles}
          >
            <AddFeed setIsOpenAddFeed={setIsOpenAddFeed}/>
          </Modal>
          <li>알림</li>
          <li>설정</li>
          <li>
            <NavLink to="/logout">로그아웃</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
