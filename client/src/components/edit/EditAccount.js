import React from "react";
import "../edit/editAccount.css";
import Navbar from "../feed/layout/Navbar";
import { useState } from "react";
import Footer from "../footer/Footer";
import { useUserState } from "../../ContextProvider";
import axios from "axios";

function EditProfile() {
  //textarea 입력값 감지
  const [textValue, setTextValue] = useState("");
  const [userState] = useUserState();
  const [user, setUser] = useState();
  const [errors, setErrors] = useState({
    regName: false,
    nick: false,
    passwordConfirm: false,
    email: false,
    phone: false,
  });

  //textarea에 입력하는 글자 수 표현하기 위함.
  const handlesetValue = (e) => {
    setTextValue(e.target.value);
  };

  //{}:새 객체
  //인풋칸이 비어있으면 경고메시지 띄움.
  const inputCheck = (e) => {
    if (e.target.value === "") {
      setErrors({
        ...errors,
        //input의 name을 추적함.
        [e.target.name]: true,
      });
    } else {
      setErrors({
        ...errors,
        [e.target.name]: false,
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(userState);
    updateMember(userState);
  };

  function updateMember() {
    axios({
      method: "POST",
      url: `/api/users/info`,
      data: userState,
      withCredentials: true,
    })
      .then((res) => {
        alert("정보가 수정되었습니다.");
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(userState);
      });
  }

  return (
    userState && (
      <div>
        <body>
          {/* 프로필 사진, 이름, 활동명, 소개, 이메일, 전화번호, 비밀번호 변경 -> 이전비번,새비번,새비번 확인,비밀번호 찾기   
          프로필 사진 로그인한 정보 가져오기
        */}
          <div className="editContainer">
            <div className="navbarWrap">
              <Navbar />
            </div>
            <div className="editAccountWrap">
              <div className="editAccountBox">
                <div className="editRow" id="rowTop">
                  <div className="left">
                    <div>
                      <button className="editPhotoBtn">
                        <div className="editImgWrap">
                          <img
                            alt="본인 프로필 사진"
                            className=""
                            src={userState.info.image}
                            id="editprofile"
                          ></img>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="right">
                    <h1 id="editNick">{userState.info.nick}</h1>
                    <button className="" type="button" id="profileChnBtn">
                      프로필 사진 바꾸기
                    </button>
                  </div>
                </div>
                <form onSubmit={submitForm}>
                  <div className="editRow">
                    <aside>
                      <label className="editLabel">이름</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        name="regName"
                        className="editRowInput"
                        defaultValue={userState.info.name}
                        onChange={inputCheck}
                      ></input>
                      {errors.regName && (
                        <p className="warningMsg">이름을 입력해주세요.</p>
                      )}
                    </div>
                  </div>

                  <div className="editRow" id="editRowNickName">
                    <aside>
                      <label className="editLabel">활동명</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        name="nick"
                        className="editRowInput"
                        defaultValue={userState.info.nick}
                        onChange={inputCheck}
                      ></input>
                      {errors.nick && (
                        <p className="warningMsg">활동명을 입력해주세요.</p>
                      )}
                    </div>
                  </div>
                  <div className="editRow" id="editNickBtn">
                    <aside>
                      <label className="editLabel"></label>
                    </aside>
                    <div>
                      <button type="button" className="editBtn">
                        중복확인
                      </button>
                    </div>
                  </div>
                  <div className="editRow" id="rowIntroduce">
                    <aside>
                      <label className="editLabel">
                        소개
                        <br />
                        <p className="selectInput">(선택)</p>
                      </label>
                    </aside>
                    <div>
                      <div>
                        <textarea
                          id="editTextarea"
                          maxLength="149"
                          value={textValue}
                          onChange={(e) => handlesetValue(e)}
                          placeholder={userState.info.self_intro}
                        ></textarea>
                        <div style={{ display: "flex" }}>
                          <p>{textValue.length}</p>/<p>150</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="editRow" id="editRowEmail">
                    <aside>
                      <label className="editLabel">이메일</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        defaultValue={userState.info.email}
                        name="email"
                        className="editRowInput"
                        onChange={inputCheck}
                      ></input>
                      {errors.email && (
                        <p className="warningMsg">이메일을 입력해주세요.</p>
                      )}
                    </div>
                  </div>
                  <div className="editRow" id="editEmailBtn">
                    <aside>
                      <label className="editLabel"></label>
                    </aside>
                    <div>
                      <button type="button" className="editBtn">
                        인증번호 받기
                      </button>
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label className="editLabel">전화번호</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        defaultValue={userState.info.phone}
                        name="phone"
                        className="editRowInput"
                        onChange={inputCheck}
                      ></input>
                      {errors.phone && (
                        <p className="warningMsg">
                          휴대폰 번호를 입력해주세요.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label className="editLabel">
                        새 비밀번호 <br />
                        <p className="selectInput">(선택)</p>
                      </label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        name="password"
                        placeholder="선택입력"
                        className="editRowInput"
                      ></input>
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label className="editLabel">새 비밀번호 확인</label>
                    </aside>
                    <div>
                      <input
                        className="editRowInput"
                        type="text"
                        placeholder=""
                        name="passwordConfirm"
                      ></input>
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label className="editLabel"></label>
                    </aside>
                    <button type="submit" className="editBtn">
                      수정
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Footer />
          </div>
        </body>
      </div>
    )
  );
}

export default EditProfile;
