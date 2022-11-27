import React, { useState } from "react";
import Logincss from "./Login.module.css";
import Logo from "../../images/loginLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Footer from "../footer/Footer";
import Modal from "./Modal";

function Login() {
  //1. 이메일 ,비밀번호 저장할 변수를 만든다.
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Email, Password);
  };

  //2.서버에 전송한다. 전송할 때 이메일,비밀번호 값이 db값과 같은지 확인한다.(get)
  //다르면 로그인 안되고 비번 틀리면 비번 틀렸다 하고, 이메일 틀리면 없는 아이디 입니다 띄우기
  async function Log() {
    await axios({
      method: "POST",
      url: `api/auth/login`,
      data: Email,
      Password,
      withCredentials: true,
    })
      .then((res) => {
        navigator("/MyFeed");
        console.log(res);
      })
      .catch((e) => {
        alert("비밀번호가 틀렸거나 계정이 존재하지 않습니다.");
        console.log(e);
      });
  }

  return (
    <>
      <body>
        {/* 메인피드에서 로그아웃 누르면 로그인 화면으로 넘어오는 것도 생각 */}
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
                //action="http://localhost:5100/auth/login"
              >
                <h1 className={Logincss.loginIcon}>
                  <FontAwesomeIcon icon={faPaw} />
                </h1>
                <div>
                  <input
                    type="email"
                    placeholder="이메일"
                    className={Logincss.logInput}
                    id={Logincss.logEmail}
                    name="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    className={Logincss.logInput}
                    id={Logincss.pw}
                    name="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="로그인"
                  className={Logincss.logInput}
                  id={Logincss.logBtn}
                />
                {/* 로그인 버튼 눌렀을 때 아이디 비밀번호 일치하면 -> 피드화면으로 넘어가기
                        아이디가 틀렸을 시 -> "존재하지 않는 아이디 입니다."
                        비밀번호가 틀렸을 시  -> "비밀번호가 일치하지 않습니다."  */}
                <div className={Logincss.findPw}>
                  <a href="/modal">아이디 혹은 비밀번호를 잊으셨나요?</a>
                  {/* `<Modal />` */}
                </div>
                <div className={Logincss.mvReg}>
                  <a href="/register">계정이 없으신가요? 가입하기</a>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <Footer className={Logincss.logFooter} /> */}
      </body>
    </>
  );
}

export default Login;
