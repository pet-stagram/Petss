import React, { useState } from "react";
import Logincss from "./Login.module.css";
import Logo from "../../images/loginLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "./Modal";
import Footer from "../footer/Footer";
import styled, { css } from "styled-components";

function Login({ setIsLogined }) {
  //유저 정보 저장
  const [user, setUser] = useState({ email: "", password: "" });

  //입력값 감지
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //제출
  const onSubmit = (e) => {
    e.preventDefault();
    if (user !== "") {
    } else if (e.key === "Enter") {
      Log();
    }

    if (user === "") {
      alert("이메일과 비밀번호를 입력바랍니다.");
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      Log();
    }
  };

  //db전달
  function Log() {
    axios({
      method: "POST",
      url: `api/auth/login`,
      data: user,
      withCredentials: true,
    })
      .then((res) => {
        setTimeout(() => {
          setIsLogined("true");
          sessionStorage.setItem("isLogin", "true");
        }, 150);
      })
      .catch((e) => {
        alert("비밀번호가 틀렸거나 계정이 존재하지 않습니다.");
        // console.log(e);
      });
  }

  //아이디, 비밀번호 찾기 팝업창
  const [openModal, setOpenModal] = useState(false);

  //팝업창 노출
  const showModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <context>
        <body>
          <div className={Logincss.logContainer}>
            <div className={Logincss.mainBox}>
              <div className={Logincss.logoBox}>
                <div className={Logincss.logo}>
                  <div>
                    <img src={Logo} alt="펫스 로고 사진" />
                  </div>
                </div>
              </div>
              <div className={Logincss.logBox}>
                <form
                  className={Logincss.login}
                  method="post"
                  onSubmit={onSubmit}
                  onKeyDown={onKeyPress}
                >
                  <h1 className={Logincss.loginIcon}>
                    <FontAwesomeIcon icon={faPaw} />
                  </h1>
                  <div className={Logincss.inputwrap}>
                    <input
                      type="email"
                      placeholder="이메일"
                      className={Logincss.logInput}
                      id={Logincss.logEmail}
                      name="email"
                      autoComplete="off"
                      onChange={onChange}
                    />
                  </div>
                  <div className={Logincss.inputwrap}>
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className={Logincss.logInput}
                      id={Logincss.pw}
                      name="password"
                      autoComplete="off"
                      onChange={onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    value="로그인"
                    className={Logincss.logInput}
                    id={Logincss.logBtn}
                    style={{ marginBottom: "30px" }}
                  />
                  <div className={Logincss.findPw}>
                    <a className="openModalBtn" onClick={showModal} href>
                      비밀번호를 잊으셨나요?
                    </a>
                    {openModal && <Modal setOpenModal={setOpenModal} />}
                  </div>
                  <div className={Logincss.mvReg}>
                    <a href="/register">계정이 없으신가요? 가입하기</a>
                  </div>
                </form>
              </div>
            </div>
            <Footer />
          </div>
        </body>
      </context>
    </>
  );
}

export default Login;
