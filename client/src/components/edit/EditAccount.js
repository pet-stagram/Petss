import React from "react";
import "../edit/editAccount.css";
import Navbar from "../feed/layout/Navbar";
//import Profile from "../../images/1.jpg";
//import $ from "jquery"; //jquery 세팅
import { useEffect } from "react";

function EditProfile() {
  //axios.get()으로 유저 정보 가져와서 input칸에 반영시키고 제출할 때 유저정보 수정될 수 있게(post)

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://unpkg.com/lodash";
  //   script.async = true;
  //   document.body.appendChild(script);
  // });

  // async function limitTextarea() {
  //   $("#editTextarea").onkeyUp(function (e) {
  //     let content = $(this).val();

  //     //글자수 세기
  //     if (content.length === 0 || content === "") {
  //       $(".textCount").text("0");
  //     } else {
  //       $(".textCount").text(content.length);
  //     }

  //     //글자 수 제한
  //     if (content.length > 150) {
  //       //150자 부터는 타이핑 되지 않게
  //       $(this).val($(this).val().substring(0, 200));
  //     }
  //   });
  // }

  // limitTextarea();

  // const onkeyUp = () => {
  //   document.getElementById("");
  // };

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
                        maxLength="150"
                        placeholder="텍스트를 입력하세요"
                        // onKeyDown="calc()"
                        // onkeyUp="calc()"
                        // onKeyPress="calc()"
                      ></textarea>
                      <div style={{ display: "flex" }}>
                        <p className="textCount"></p>/
                        <p className="textTotal">150</p>
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
                      className=""
                      type="text"
                      aria-required="true"
                      placeholder="이메일"
                      name=""
                    ></input>
                  </div>
                </div>
                <div className="editRow">
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
                      className=""
                      type="text"
                      aria-required="true"
                      placeholder="전화번호"
                      name=""
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
                <div className="editRow">
                  <aside>
                    <label></label>
                  </aside>
                  <button type="button">제출</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default EditProfile;