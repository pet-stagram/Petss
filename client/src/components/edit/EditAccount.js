import React from "react";
import "../edit/editAccount.css";
import Navbar from "../feed/layout/Navbar";
//import Profile from "../../images/1.jpg";
//import $ from "jquery"; //jquery 세팅
import { useEffect, useState } from "react";
import Footer from "../footer/Footer";

function EditProfile() {
  //axios.get()으로 유저 정보 가져와서 input칸에 반영시키고 제출할 때 유저정보 수정될 수 있게(post)

  //textarea 입력값 감지
  const [textValue, setTextValue] = useState("");
  const handlesetValue = (e) => {
    setTextValue(e.target.value);
  };
  return (
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
                      {/* <img
                        alt="본인 프로필 사진"
                        className=""
                        src={Profile}
                      ></img> */}
                    </button>
                  </div>
                </div>
                <div className="right">
                  <h1>닉네임자리</h1>
                  <button className="" type="button">
                    프로필 사진 바꾸기(누르면 모달 띄우기)
                  </button>
                </div>
              </div>
              <form className="" method="post">
                <div className="editRow">
                  <aside>
                    <label>이름</label>
                  </aside>
                  <div>
                    <input
                      className=""
                      type="text"
                      aria-required="true"
                      placeholder="이름"
                      name=""
                      value=""
                    ></input>
                  </div>
                </div>
                <div className="editRow">
                  <aside>
                    <label>활동명</label>
                  </aside>
                  <div>
                    <input
                      className=""
                      type="text"
                      aria-required="true"
                      name=""
                      value=""
                      placeholder="활동명"
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
                        placeholder="텍스트를 입력하세요"
                        value={textValue}
                        onChange={(e) => handlesetValue(e)}
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
                      aria-required="true"
                      placeholder="이메일"
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
                      aria-required="true"
                      placeholder="전화번호"
                      value=""
                    ></input>
                  </div>
                </div>
                <div className="editRow">
                  <aside>
                    <label>이전 비밀번호</label>
                  </aside>
                  <div>
                    <input
                      className=""
                      type="text"
                      aria-required="true"
                      placeholder="기존 비밀번호 띄울 예정"
                      name=""
                      value=""
                    ></input>
                  </div>
                </div>
                <div className="editRow">
                  <aside>
                    <label>새 비밀번호</label>
                  </aside>
                  <div>
                    <input
                      className=""
                      type="text"
                      aria-required="false"
                      placeholder=""
                      name=""
                      value=""
                    ></input>
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
                      aria-required="false"
                      placeholder=""
                      name=""
                      value=""
                    ></input>
                  </div>
                </div>
                <div className="editRow" id="editSubmit">
                  <aside>
                    <label></label>
                  </aside>
                  <button type="button">제출</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </div>
  );
}

export default EditProfile;
