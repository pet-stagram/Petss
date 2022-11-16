import React from "react";
import Logo from "../../images/regLogo.png";
import "./register.css";

function register() {
  return (
    <>
      <body>
        <div className="regContainer">
          <div className="mainBox">
            <div className="logoBox">
              <div className="logo">
                <img src={Logo} alt="logo" />
              </div>
            </div>
            <div class="regBox">
              <form class="register" method="post">
                {/* maxlength정하고(db랑 맞춰야하겠지?) 모든 입력칸 필수 입력으로 만들고 인풋 칸 밑에 경고글씨 띄우기
                    해당 인풋칸을 눌렀다가 벗어날 때 입력확인, 중복검사 되도록, 그에 맞춰서 경고글씨 바뀜 */}
                <div class="nameWrap">
                  <input
                    type="text"
                    placeholder="이름"
                    class="regInput"
                    name="name"
                    id="name"
                    autoComplete="off"
                  />
                </div>
                <div class="nickWrap">
                  <input
                    type="text"
                    placeholder="활동명"
                    name="nickname"
                    class="regInput"
                    autoComplete="off"
                  />
                  {/* 인풋 밑에 글자 띄우는 형식으로 ~ 사용가능한 활동명입니다 or 이미 사용중인 활동명입니다. */}
                </div>
                {/* 비밀번호 규칙 정하기  */}
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    class="regInput"
                    id="pw"
                    name="pw"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호 재확인"
                    class="regInput"
                    name="pw"
                    autoComplete="off"
                  />
                </div>
                {/* 재입력 할 때 위에 입력한 값과 비교하기  */}
                <div>
                  <input
                    type="text"
                    placeholder="휴대폰 번호"
                    class="regInput"
                    name="phone"
                    autoComplete="off"
                  />
                </div>
                <div class="emailWrap">
                  <div>
                    <input
                      type="text"
                      placeholder="이메일 "
                      class="regInput"
                      id="email"
                      name="email"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="인증번호 받기"
                      class="regInput"
                      id="certification"
                      autoComplete="off"
                    />
                  </div>
                  {/* 인증번호 받기 눌렀을 때 db에 존재하는 이메일이면 "이미 존재하는 이메일 입니다" 글자 띄우고 
                        인증가능한 이메일이면 "인증번호가 전송되었습니다 ". 
                        비활성화된 인증번호 입력칸 활성화 되고 회원가입 버튼 누를때 인증번호 일치하는지 검사 
                        인증번호 틀렸을 시 띄우는 팝업창도 필요함. 성공하면  "인증에 성공하였습니다. " 하고 넘어가야함.
                        인증번호는 6자리 이고 한 칸씩 입력하게 만든다. 인증번호 입력하는 창 자체를 팝업으로 띄우는 게 나을듯. 문자인증 처럼..
                       아니면 처음부터 인증번호 입력 칸 만들고 비활성화에서 인증번호 받으면 -> 활성화 하게 
                       인증번호 session 폴더에 저장(백앤드),번호 다르면 400에러 띄우게 하심 
                       다시 시도 요청, 번호 같으면 200띄움. */}
                </div>
                <input
                  type="text"
                  placeholder="인증번호 입력하세요"
                  class="regInput"
                  id="chkCert"
                  disabled
                />
                <input
                  type="submit"
                  value="회원가입"
                  class="regInput"
                  id="regBtn"
                />
                <div class="mvLog">
                  <a href="/login">계정이 이미 있으신가요? 로그인</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default register;
