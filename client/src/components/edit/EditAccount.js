import React, { useCallback, useEffect, useRef } from "react";
import "../edit/editAccount.css";
import Navbar from "../feed/layout/Navbar";
import { useState } from "react";
import Footer from "../footer/Footer";
import { useUserState } from "../../ContextProvider";
import axios from "axios";
import ModalEdit from "../edit/ModalEdit";
import Toast from "react-bootstrap/Toast";

function EditProfile() {
  //State가 바뀌면 재랜더링 된다.
  //화면에서 바뀌는건 set으로

  //textarea 입력값 감지
  const [textValue, setTextValue] = useState("");
  //가져오는 유저 정보
  const [userState] = useUserState();
  //중복검사
  const [isNickOk, setIsNickOk] = useState(true);
  const [isEmailOk, setIsEmailOk] = useState(true);
  const [pw, setPw] = useState(false);
  const [pwConfirm, setPwConfirm] = useState(false);
  //인풋 칸 활성화
  const [disable, setDisable] = useState(true);
  //가져온 유저 정보 저장
  const [user, setUser] = useState({
    regName: userState?.info.name,
    nick: userState?.info.nick,
    selfIntro: userState?.info.self_intro,
    email: userState?.info.email,
    phone: userState?.info.phone,
    password: "",
    passwordConfirm: "",
  });

  //console.log(user.nick);
  //에러메시지 띄우는 용도
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
  //onChange
  const inputCheck = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
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

  //닉네임 중복 체크 함수
  const nickCheck = (e) => {
    axios({
      method: "POST",
      url: `api/auth/nick`,
      data: { nick: user.nick },

      //객체 생성 => {key : value}
    })
      .then((res) => {
        setIsNickOk(true);
        alert("사용 가능한 활동명입니다.");
        console.log(res);
      })
      .catch((e) => {
        setIsNickOk(false);
        alert("이미 사용 중인 활동명입니다.");
        console.log(e);
      });
  };

  //이메일 중복 체크 함수
  const emailCheck = (e) => {
    axios({
      method: "POST",
      url: `api/auth/email`,
      data: { email: user.email },
      //key 값이 server req.body(객체) 의 key값이랑 같아야 한다.
      //post로 줬을때만 body로 전달가능
    })
      .then((res) => {
        setIsEmailOk(true);
        setDisable(false);
        alert("사용 가능한 이메일입니다.");
        console.log(res);
      })
      .catch((e) => {
        setIsEmailOk(false);
        alert("이미 사용 중인 이메일입니다.");
        console.log(e);
      });
  };

  //비밀번호 중복 체크
  //useEffect(()=>{},[요 안에 있는 값이 바뀔때 useEffect가 실행된다. 지정해서 렌더링 가능....])
  useEffect(() => {
    //console.log(user?.password); ->?. 문법은 undefined들어가도 실행된다.
    passwordCk();
  }, [user?.password]);

  const passwordCheck = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    //setUser은 비동기라서 동기 다 처리하고 진행된다.
  };
  const passwordRegex = /^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z\d]{8,30}$/;

  const passwordCk = () => {
    if (user.password) {
      if (user?.password.match(passwordRegex) === null) {
        setPw(true);
      } else {
        setPw(false);
      }
    }
  };

  //setState할 때 현재 state랑 변경하려는 값이랑 똑같으면 랜더링을 안 함!!
  const passwordDoubleCheck = (e) => {
    if (user.password !== e.target.value) {
      setPwConfirm(true);
    } else {
      setPwConfirm(false);
    }
  };
  //수정 버튼 누를 때 발생(===============최종 제출=================)
  const submitForm = (e) => {
    e.preventDefault();
    if (isNickOk === false || isEmailOk === false) {
      alert("활동명이나 이메일 중복확인 바랍니다.");
    }
    if (user !== undefined) {
      updateMember();
    }
  };

  //서버 전달 함수
  function updateMember(e) {
    axios({
      method: "POST",
      url: `/api/users/info`,
      data: user,
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
  //모달 관련 함수들============================
  const [isOepn, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(true);
  };

  return (
    userState && (
      <div>
        <body>
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
                    <button
                      type="button"
                      id="profileChnBtn"
                      onClick={handleModal}
                    >
                      프로필 사진 바꾸기
                    </button>
                    {isOepn && <ModalEdit setIsOpen={setIsOpen}></ModalEdit>}
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
                        id="editName"
                        required
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
                        id="editNickname"
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
                      <button
                        type="button"
                        className="editBtn"
                        onClick={nickCheck}
                      >
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
                          name="selfIntro"
                          maxLength="149"
                          value={textValue}
                          onChange={(e) => handlesetValue(e)}
                          placeholder={userState.info.self_intro}
                        ></textarea>
                        <div style={{ display: "flex" }}>
                          <p>{textValue.trim().length}</p>/<p>150</p>
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
                        type="email"
                        defaultValue={userState.info.email}
                        name="email"
                        id="editEmail"
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
                      <button
                        type="button"
                        className="editBtn"
                        onClick={emailCheck}
                      >
                        인증번호 받기
                      </button>
                      <input
                        type="text"
                        id="editCertifi"
                        autoComplete="off"
                        placeholder="인증번호를 입력하세요"
                        disabled={disable}
                      ></input>
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
                        id="editPhone"
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
                        type="password"
                        name="password"
                        placeholder="선택입력"
                        className="editRowInput"
                        onChange={passwordCheck}
                      ></input>
                      {pw && (
                        <p className="warningMsg">
                          영문 숫자포함 8~30자리를 입력해주세요.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label className="editLabel">새 비밀번호 확인</label>
                    </aside>
                    <div>
                      <input
                        className="editRowInput"
                        type="password"
                        name="passwordConfirm"
                        onChange={passwordDoubleCheck}
                      ></input>
                      {pwConfirm && (
                        <p className="warningMsg">
                          비밀번호가 일치하지 않습니다.
                        </p>
                      )}
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
