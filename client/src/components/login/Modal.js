import React from "react";
import "./Modal.css";
import Lock from "../../images/lock.png";
function Modal({ setOpenModal, close }) {
  //모달창 닫기
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    //모달이 열릴때 openModal 클래스 생성됨.

    <div className="pwModalContainer">
      <div className="pwModal">
        <div id="titleCloseBtn">
          <button onClick={closeModal}> X </button>
        </div>
        <div className="lockImgWrap">
          <div className="lockImg">
            <img src={Lock} alt="자물쇠 모양 이미지" id="lock"></img>
          </div>
        </div>
        <div>
          <div className="pwModaltitle">
            <h1>비밀번호를 잊으셨나요?</h1>
            <p>
              가입된 이메일을 입력하시면 비밀번호 재설정이 가능한 메일을
              보내드립니다.
            </p>
          </div>

          <div className="pwModalbody">
            <div>
              <label id="pwModalemail">이메일</label>
              <input id="pwModalInput" type="email"></input>
            </div>
          </div>
          <div className="pwModalfooter">
            <button onClick={close} className="pwModalBtn">
              취소
            </button>
            <button className="pwModalBtn">확인</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
