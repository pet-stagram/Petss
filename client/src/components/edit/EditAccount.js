import React from "react";
import "../edit/editAccount.css";
import Navbar from "../feed/layout/Navbar";
import { useState } from "react";
import Footer from "../footer/Footer";
import { useUserState } from "../../ContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

function EditProfile() {
  //textarea 입력값 감지
  const [textValue, setTextValue] = useState("");
  const [userState] = useUserState();
  const [user, setUser] = useState();
  const [errors, setErrors] = useState({
    regName: false,
    nick: false,
    password: false,
    email: false,
    phone: false,
  });

  const handlesetValue = (e) => {
    setTextValue(e.target.value);
  };

  //{}:새 객체 ,
  const inputCheck = (e) => {
    if (e.target.value === "") {
      setErrors({
        ...errors,
        [e.target.name]: true,
      });
    }
  };

  const submitForm = (e, userState) => {
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
                      <button className="editPhotoBtn" id="edPhBtn">
                        <div className="editImgWrap">
                          <img
                            alt="본인 프로필 사진"
                            className=""
                            src={userState.info.image}
                          ></img>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="right">
                    <h1>{userState.info.nick}</h1>
                    <button className="" type="button" id="profileChnBtn">
                      프로필 사진 바꾸기
                    </button>
                  </div>
                </div>
                <form onSubmit={submitForm}>
                  <div className="editRow">
                    <aside>
                      <label>이름</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        name="regName"
                        defaultValue={userState.info.name}
                        onChange={inputCheck}
                      ></input>
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label>활동명</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        name="nick"
                        defaultValue={userState.info.nick}
                        onChange={inputCheck}
                      ></input>
                    </div>
                  </div>
                  <div className="editRow" id="rowIntroduce">
                    <aside>
                      <label>소개</label>
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
                      <label>이메일</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        defaultValue={userState.info.email}
                        name="email"
                        onChange={inputCheck}
                      ></input>
                    </div>
                  </div>
                  <div className="editRow" id="editEmailCheck">
                    <aside>
                      <label></label>
                    </aside>
                    <div>
                      <button type="button">이메일 확인</button>
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label>전화번호</label>
                    </aside>
                    <div>
                      <input
                        type="text"
                        defaultValue={userState.info.phone}
                        name="phone"
                        onChange={inputCheck}
                      ></input>
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label>새 비밀번호</label>
                    </aside>
                    <div>
                      <input type="text" name="passwordConfirm"></input>
                    </div>
                  </div>
                  <div className="editRow">
                    <aside>
                      <label>새 비밀번호 확인</label>
                    </aside>
                    <div>
                      <input
                        className=""
                        type="text"
                        placeholder=""
                        name=""
                      ></input>
                    </div>
                  </div>
                  <div className="editRow" id="editSubmit">
                    <aside>
                      <label></label>
                    </aside>
                    <input type="submit" value="수정"></input>
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
