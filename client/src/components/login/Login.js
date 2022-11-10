import React from "react";
import "Login.css";
import Logo from "../../images/petssLogo.png";

function Login() {
  return (
    <>
      <body>
        <div class="logContainer">
          <div class="mainBox">
            <div class="logoBox">
              <div class="logo">
                {/* 로고 바꾸고 이미지 화질 개선하기 */}
                <div>
                  <img src={Logo} alt="Logo" />
                </div>
              </div>
            </div>
            <div class="logBox">
              <form class="login">
                <h2 class="loginfont">
                  <strong>Login</strong>
                </h2>
                <div>
                  <input
                    type="text"
                    placeholder="이메일"
                    class="email"
                    name="email"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    class="pw"
                    name="pw"
                  />
                </div>
                <input type="submit" value="로그인" class="btn" />
                <div class="findPw">
                  {/* 아이디 / 비밀번호 찾는 팝업창 만들기 */}
                  <a href="#">아이디 혹은 비밀번호를 잊으셨나요?</a>
                </div>
                <div class="mvReg">
                  <a href="#">계정이 없으신가요? 가입하기</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Login;
