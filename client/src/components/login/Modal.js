import React from "react";
import "./Modal.css";
import Lock from "../../images/lock.png";
function Modal({ setOpenModal, close }) {
  //추가해야 할 부분 : 이메일 값 보내기, 가입된 이메일이면 메일로 가상비밀번호 보내기
  //가상비밀번호가 그 이메일의 비밀번호로 바뀌어야 함.
  //그래서 로그인하고 비번 바꾸면 된다.

  //모달창 닫기
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="pwModalContainer">
      <div className="pwModal">
        <div>
          <button onClick={closeModal} id="closeBtn">
            X
          </button>
        </div>
        <div className="lockImgWrap">
          <div className="lockImg">
            <img src={Lock} alt="자물쇠 모양 이미지" id="lock"></img>
          </div>
        </div>
        <div>
          <div className="pwModaltitle">
            <h1>비밀번호를 잊으셨나요?</h1>
            <p id="pwModalMsg">
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
