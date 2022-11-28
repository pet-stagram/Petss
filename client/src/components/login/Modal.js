import React from "react";
import "./Modal.css";

function Modal({ props }) {
  const { open, close, header } = props;

  return (
    //모달이 열릴때 openModal 클래스 생성됨.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={close}> X </button>
          </div>
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
            <button onClick={close}>취소</button>
            <button>확인</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
