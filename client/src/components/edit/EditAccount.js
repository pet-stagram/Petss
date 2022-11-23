import React from "react";
import Navbar from "../feed/layout/Navbar";
import "../edit/editAccount.css";

function EditProfile() {
  //axios.get()으로 유저 정보 가져와서 input칸에 반영시키고 제출할 때 유저정보 수정될 수 있게(post)
  return (
    <div>
      <body>
        {/* 프로필 사진, 이름, 활동명, 소개, 이메일, 전화번호, 비밀번호 변경 -> 이전비번,새비번,새비번 확인,비밀번호 찾기   
          프로필 사진 로그인한 정보 가져오기
        */}
        <div className="editContainer">
          <div className="editProfileWrap">
            <div className="editProfileBox">
              <div className="rowPhotoChange">
                <div className="left">
                  <div>
                    <button className="">
                      <img alt="내 프로필 사진바꾸기" className="" src=""></img>
                    </button>
                  </div>
                </div>
                <div className="right">
                  <h1>로그인 한 유저 활동명 띄우기</h1>
                  <button className="" type="button">
                    프로필 사진 바꾸기
                  </button>
                </div>
              </div>
              <form className="" method="post">
                <div className="rowName">
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
                <div className="rowNick">
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
                    ></input>
                  </div>
                </div>
                <div className="rowIntro">
                  <aside>
                    <label>소개</label>
                  </aside>
                  <div>
                    <div>
                      <textarea className=""></textarea>
                      <div>글자적으면 숫자 올라가고 텍스트 수 제한걸기</div>
                    </div>
                  </div>
                </div>
                <div className="rowEmail">
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
                <div className="rowChkEmail">
                  <aside>
                    <label></label>
                  </aside>
                  <div>
                    <button type="button">이메일 확인</button>
                  </div>
                </div>
                <div className="rowPhone">
                  <aside>
                    <label>전화번호</label>
                  </aside>
                  <div>
                    <input
                      className=""
                      type="text"
                      aria-required="false"
                      placeholder="전화번호"
                      name=""
                      value=""
                    ></input>
                  </div>
                </div>
                <div className="rowBtn">
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
