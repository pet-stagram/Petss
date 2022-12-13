import React from "react";
import "./modalEdit.css";

function ModalEdit({ toggleShow }) {
  //모달창 닫기
  const closeModal = () => {
    toggleShow(false);
  };

  return (
    <div className="editModalContainer">
      <div className="editModal">
        <div>프로필 사진 바꾸기</div>
        <div id="uploadPhoto">
          <button type="button" className="editModalBtn">
            사진 업로드
          </button>
        </div>
        <div>
          <button type="button" id="deletePhoto" className="editModalBtn">
            현재 사진 삭제
          </button>
        </div>
        <div>
          <button type="button" onClick={closeModal} className="editModalBtn">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
