import React from "react";
import "./Login.css";
import Logo from "../../images/loginLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function Login() {
  // const [email, setEmail] = useState("");
  // const [pw, setPw] = useState("");
  // const [errMsg, setErrMsg] = useState("");

  // //이메일 값 정합성 판단하는 유효성 함수
  // const validateEmail = (email, pw) => {
  //   const isValidated = false;

  //   if (email === "") {
  //     setErrMsg("이메일을 입력해주세요.");
  //   } else {
  //     isValidated = true;
  //     setErrMsg("");
  //   }

  //   return isValidated;
  // };

  // //이메일 폼 입력값이 변경되는 이벤트를 관리할 input handler
  // const emailChangeHandler = (e) => {
  //   const inputValue = e.target.value;
  //   setEmail(e.target.value);
  // };

  // //로그인 요청할 submit function
  // const onSubmit = (e) => {
  //   e.preventDefault(); //화면 새로고침 방지
  //   const isValidated = validateEmail(email);
  //   if (isValidated) {
  //     login({ email });
  //   }
  // };

  return (
    <>
      <body>
        {/* 메인피드에서 로그아웃 누르면 로그인 화면으로 넘어오는 것도 생각 */}
        <div className="logContainer">
          <div className="mainBox">
            <div className="logoBox">
              <div className="logo">
                <div>
                  <img src={Logo} alt="펫스 로고 사진" />
                </div>
              </div>
            </div>
            <div className="logBox">
              <form
                className="login"
                method="post"
                action="http://localhost:5100/auth/login"
              >
                {/*사용자 입력 데이터 저장해야 한다*/}
                {/* <h1 class="loginfont"> */}
                <h1 className="loginIcon">
                  <FontAwesomeIcon icon={faPaw} />
                </h1>
                <div>
                  <input
                    type="email"
                    placeholder="이메일"
                    className="logInput"
                    id="logEmail"
                    name="email"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    className="logInput"
                    id="pw"
                    name="pw"
                    autoComplete="off"
                  />
                </div>
                <input
                  type="submit"
                  value="로그인"
                  className="logInput"
                  id="logBtn"
                />
                {/* 로그인 버튼 눌렀을 때 아이디 비밀번호 일치하면 -> 피드화면으로 넘어가기
                        아이디가 틀렸을 시 -> "존재하지 않는 아이디 입니다."
                        비밀번호가 틀렸을 시  -> "비밀번호가 일치하지 않습니다."  */}
                <div className="findPw">
                  <a href="/modal">아이디 혹은 비밀번호를 잊으셨나요?</a>
                  {/* modal로 아이디,비번 찾는 페이지 만들기 */}
                </div>
                <div className="mvReg">
                  <a href="/register">계정이 없으신가요? 가입하기</a>
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
