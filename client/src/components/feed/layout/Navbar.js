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

const Navbar = ({setIsLogined}) => {
  const [userState] = useUserState();
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  console.log(setIsLogined);
  // const [modalOn, setModalOn] = React.useState(false);
  // const onOpenModal = () => {
  // setModalOn(!modalOn);
  // }

  const [isOpenAddFeed, setIsOpenAddFeed] = useState(false);

  // const getLoginInfo = async () => {
    //TODO: 세션한 사람의 아이디를 받아와야함

  //   await axios({
  //     method: "GET",
  //     url: `api/users/${SESSION_ID}`,
  //     withCredentials: true,
  //   })
  //     .then((result) => {
  //       console.log("로그인 유저 조회 성공");
  //       console.log(result);
  //       setData(result.data);
  //     })
  //     .catch((err) => {
  //       // err.response.status === '400'
  //       console.log("로그인 유저 조회 실패");
  //       console.log(err);
  //     });
  // };

  const logout = () => {
    setIsLogined("false");
  }

  // useEffect(() => {
  //   getLoginInfo();
  // }, []);

  
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
          <li onClick={()=>logout()}>
            로그아웃
          </li>
        </ul>
      </nav>
    </div>
  )
  : ""
};

export default Navbar;
