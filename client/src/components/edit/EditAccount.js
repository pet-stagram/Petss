import React, { useCallback, useEffect, useRef, useMemo } from "react";
import "../edit/editAccount.css";
import Navbar from "../feed/layout/Navbar";
import { useState } from "react";
import Footer from "../footer/Footer";
import { useUserState } from "../../ContextProvider";
import axios from "axios";
import ModalEdit from "../edit/ModalEdit";
import Basic from "../../images/basic.png";

function EditProfile() {
  /**
   *State가 바뀌면 재랜더링 된다.
   *화면에서 바뀌는건 set으로.
   *setState할 때 현재 state랑 변경하려는 값이랑 똑같으면 랜더링을 하지 않는다.
   *{}:새 객체
   *key 값이 server req.body(객체) 의 key값이랑 같아야 한다.
   *post로 줬을때만 body로 전달 가능
   */

  //가져오는 로그인 유저 정보
  const [userState] = useUserState();
  //중복검사
  const [isNickOk, setIsNickOk] = useState(true);
  const [isEmailOk, setIsEmailOk] = useState(true);
  const [pw, setPw] = useState(false);
  const [pwConfirm, setPwConfirm] = useState(false);
  //인풋 칸 활성화
  const [disable, setDisable] = useState(true);
  //가져온 유저값 저장하기
  const [user, setUser] = useState({
    name: userState?.info.name,
    nick: userState?.info.nick,
    pw: undefined,
    email: userState?.info.email,
    phone: userState?.info.phone,
    selfIntro: userState?.info.self_intro,
  });

  //에러메시지 띄우는 용도
  const [errors, setErrors] = useState({
    name: false,
    nick: false,
    passwordConfirm: false,
    email: false,
    phone: false,
  });
  //비밀번호 저장
  const [userPw, setUserPw] = useState({ pw: "" });

  //textarea에 입력하는 글자 수 표현하기 위함.
  const handlesetValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    //setTextValue(e.target.value);
  };

  //onChange (인풋칸이 비어있으면 경고메시지 띄움.)
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

  // 닉네임 중복 체크 함수
  const nickCheck = (e) => {
    axios({
      method: "POST",
      url: `api/auth/nick`,
      data: { nick: user.nick },
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
      //
      //post로 줬을때만 body로 전달가능
    })
      .then((res) => {
        setIsEmailOk(true);
        setDisable(false);
        alert(
          "사용 가능한 이메일입니다. 메일에서 인증번호를 확인하시고 입력해주세요."
        );
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
  }, [userPw?.pw]);

  const passwordCheck = (e) => {
    setUserPw({
      ...userPw,
      [e.target.name]: e.target.value,
    });
    //setUser은 비동기라서 동기 다 처리하고 진행된다.
  };
  const passwordRegex = /^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z\d]{8,30}$/;

  const passwordCk = () => {
    if (userPw.pw) {
      if (userPw?.pw.match(passwordRegex) === null) {
        setPw(true);
      } else {
        setPw(false);
      }
    }
  };

  const passwordDoubleCheck = (e) => {
    if (userPw.pw !== e.target.value) {
      setPwConfirm(true);
    } else {
      setPwConfirm(false);
    }
  };

  /**최종적으로 제출할 때 실행 */
  const submitForm = (e) => {
    e.preventDefault();
    if (isNickOk === false || isEmailOk === false) {
      alert("활동명이나 이메일 중복확인 바랍니다.");
    }
    if (user !== undefined) {
      updateMember();
    }
  };

  /**서버 전달 함수 */
  function updateMember(e) {
    axios
      .put("/api/users/info", { user, userPw })
      .then((res) => {
        alert("정보가 수정되었습니다.");
        console.log(res);
        console.log(user);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  /**모달 관련 */
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(true);
  };

  /**프로필 업로드 */
  /* 서버에 보내주는 실제 이미지 파일 */
  const [imageFile, setImageFile] = useState([]);

  const [profileImage, setProfileImage] = useState([]);
  const profileImgFileInput = useRef(null);
  const handleClickFileInput = () => {
    profileImgFileInput.current?.click();
  };
  //onChange event
  const uploadProfile = (e) => {
    const fileList = e.target.files;
    const length = fileList?.length;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);

      setProfileImage({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.slice(0, 5),
      });
    }
  };

  const showImage = useMemo(() => {
    if (!profileImage && profileImage == null) {
      return (
        <img
          name="image"
          src={userState?.info.image}
          alt="내 프로필 사진"
          id="editprofile"
          onClick={handleClickFileInput}
        />
      );
    }

    return (
      <img
        name="image"
        src={profileImage.thumbnail}
        alt={profileImage.type}
        onClick={handleClickFileInput}
        id="editprofile"
      />
    );
  });

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
                          <label
                            htmlFor="profileChangeBtn"
                            id="editProfileLabel"
                          >
                            {showImage}
                            {/* <img
                              alt="본인 프로필 사진"
                              name="image"
                              src={userState.info.image}
                              id="editprofile"
                            ></img> */}
                          </label>
                          <input
                            style={{ display: "none" }}
                            name="image"
                            type="file"
                            accept="image/*"
                            ref={profileImgFileInput}
                            id="profileChangeBtn"
                            onChange={uploadProfile}
                          ></input>
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
                  </div>
                </div>
                {isOpen && <ModalEdit setIsOpen={setIsOpen}></ModalEdit>}
                <form onSubmit={submitForm}>
                  <div className="editRow">
                    <aside>
                      <label className="editLabel">이름</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        name="name"
                        className="editRowInput"
                        defaultValue={userState.info.name}
                        onChange={inputCheck}
                        id="editName"
                        required
                      ></input>
                      {errors.name && (
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
                          value={user.selfIntro}
                          onChange={handlesetValue}
                          placeholder={userState.info.self_intro}
                        ></textarea>
                        <div style={{ display: "flex" }}>
                          <p>{user.selfIntro?.length}</p>/<p>150</p>
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
                        name="pw"
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
