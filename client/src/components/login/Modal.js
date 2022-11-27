import React from "react";

function Modal() {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button> X </button>
        <div className="title">
          <h1>아이디 찾기</h1>
          <p>이름과 휴대폰 번호를 입력해 주세요</p>
        </div>
        <div className="body">
          <div className="">
            <label>이름</label>
            <input></input>
          </div>
          <div>
            <label>휴대폰번호</label>
            <input></input>
          </div>
        </div>
        <div className="footer">
          <button>확인</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
