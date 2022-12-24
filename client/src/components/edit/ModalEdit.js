import React, { useState, useRef } from "react";
import "./modalEdit.css";
import basicImage from "../../images/basic.png";
import axios from "axios";

function ModalEdit({ setIsOpen, profileImage }) {
  const [image, setImage] = useState({ basicImage });
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
    }
  };

  /**창 닫기 */
  const closeModal = () => {
    setIsOpen(false);
  };

  /**프로필 사진 삭제하기(기본 프로필로 변경하기) */
  const deletePhoto = () => {
    axios.post(`api/users/image`, profileImage);
  };

  return (
    <div className="editModalContainer">
      <div className="editModal">
        <div className="editModalRow" id="editModalTitle">
          프로필 사진 바꾸기
        </div>
        <div className="editModalRow">
          <label id="uploadPhoto" htmlFor="uploadImage">
            사진 업로드
          </label>
          <input
            ref={fileInput}
            type="file"
            className="editModalBtn"
            id="uploadImage"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={onChange}
          />
        </div>
        <div className="editModalRow">
          <button type="button" id="deletePhoto" className="editModalBtn">
            현재 사진 삭제
          </button>
        </div>
        <div id="closeModal" className="editModalRow">
          <button type="button" onClick={closeModal} className="editModalBtn">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
