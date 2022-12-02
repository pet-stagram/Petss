import React from "react";
import "../edit/editAccount.css";
import Navbar from "../feed/layout/Navbar";
import Profile from "../../images/1.jpg";
//import $ from "jquery"; //jquery 세팅
import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import axios from "axios";

function EditProfile() {
  //비번 규칙 넣기

  //textarea 입력값 감지
  const [textValue, setTextValue] = useState("");
  const [data, setData] = useState({});

  const handlesetValue = (e) => {
    setTextValue(e.target.value);
  };

  const getLoginInfo = async () => {
    // const SESSION_ID = 1;

    await axios({
      method: "GET",
      url: `/api/users/me`,
      //withCredentials: true,
    })
      .then((result) => {
        setData(result.data);
        console.log("유저 조회 성공");
        console.log(result.data);
      })
      .catch((err) => {
        console.log("유저 조회 실패");
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("gk");
    getLoginInfo();
  }, []);

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
                    <button className="editPhotoBtn" id="edPhBtn">
                      <div className="editImgWrap">
                        <img
                          alt="본인 프로필 사진"
                          className=""
                          // src={data.info.image}
                          src={Profile}
                        ></img>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="right">
                  <h1>{data.info.nick}</h1>
                  <button className="" type="button" id="profileChnBtn">
                    프로필 사진 바꾸기
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
                      name=""
                      placeholder={data.info.name}
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
                      name=""
                      placeholder={data.info.nick}
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
                        placeholder={data.info.self_intro}
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
                    <input type="text" placeholder={data.info.email}></input>
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
                      value=""
                      placeholder={data.info.phone}
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
                      placeholder="*******************"
                      name=""
                      value=""
                      disabled
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
