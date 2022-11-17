import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

const AddFeed = () => {

  /* 사진 선택 컴포넌트와 피드 게시(Submit form) 컴포넌트를 나누기 위해 사용 */
    const [step, setStep] = useState(1);

    /* 서버에 보내주는 실제 이미지 파일 */
    const [imageFile, setImageFile] = useState([]);

    /* WritePost 컴포넌트에 미리보기 이미지를 출력하기 위해 변환시킨 URL */
    const [previewImage, setPreviewImage] = useState([]);
    
    return (
        <>
            {step === 1 ? (
                <SelectImage
                    setStep={setStep}
                    setImageFile={setImageFile}
                    setPreviewImage={setPreviewImage}
                />
            ) : (
                <WritePost files={imageFile} previews={previewImage} />
            )}
        </>
    );
};

/**
 * AddFeed 컴포넌트의 step state가 1일 때 렌더링하는 컴포넌트
 * 이미지 파일을 여러 장 선택할 수 있음
 * @param {Object} param0 
 */
const SelectImage = ({ setStep, setImageFile, setPreviewImage }) => {
    return (
        <>
            <div>
                <input
                    type="file"
                    name="choiceImage"
                    accept="image/*"
                    onChange={(e) =>
                        saveFileImage(e, setStep, setImageFile, setPreviewImage)
                    }
                    multiple
                />
            </div>
        </>
    );
};

/**
 * AddFeed 컴포넌트의 step state가 1이 아닐 때 렌더링하는 컴포넌트
 * previewImage를 출력하고, 서버에 제출할 수 있음
 * @param {Object} props 안녕 
 * @returns 
 */
const WritePost = ({ files, previews }) => {
  const [content, setContent] = useState("");
  
  /**
   * 다른 컴포넌트(SelectImage)에서 가져온 파일을 axios로 제출(POST)하기 위한 form handler function
   * @param {Event} e 피드 작성 폼을 제출했을 때 (onSubmit) 발생하는 이벤트
   */
  async function frmHandler(e) {
      e.preventDefault();
      let formData = new FormData();

      files.map((file) => {
          formData.append("files", file);
      });
      formData.append("content", JSON.stringify(content));

      await axios({
          method: "POST",
          url: `api/posts`,
          data: formData,
      })
          .then(() => {
              console.log("성공");
          })
          .catch(() => {});
  }
  return (
      <div>
          <form onSubmit={frmHandler} encType="multipart/form-data">
              <div>
                  <input
                      type="text"
                      name="content"
                      placeholder="글내용"
                      onChange={(e) => setContent(e.target.value)}
                      required
                  />
              </div>
              <div>
                  <input type="submit" value="SUBMIT" />
              </div>
          </form>
          <div style={{ display: "flex" }}>
              {previews.map((preview, index) => {
                  return (
                      <img
                          src={preview}
                          alt=""
                          key={index}
                          style={{ width: "400px", margin: "10px 20px" }}
                      />
                  );
              })}
          </div>
      </div>
  );
};

/**
 * 사진을 미리보기 위한 변환작업 및 File List를 Array로 변환해주는 작업
 * step을 2로 바꾸면서 AddFeed에서 출력되는 컴포넌트 전환 (SelectImage -> WritePost)
 * @param {Event} e 사진 선택 시 발생하는 onChange 이벤트
 * @param {Function} setStep step state를 변경시켜주는 함수
 * @param {Function} setImageFile imageFile state를 변경시켜주는 함수
 * @param {Function} setPreviewImage previewImage state를 변경시켜주는 함수
 */
const saveFileImage = (e, setStep, setImageFile, setPreviewImage) => {
    const previewArr = [];
    const fileArr = Array.from(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
        previewArr.push(URL.createObjectURL(e.target.files[i]));
    }
    setImageFile((prevArr) => [...prevArr, ...fileArr]);
    setPreviewImage((prevArr) => [...prevArr, ...previewArr]);
    setStep(2);
};

export default AddFeed;
