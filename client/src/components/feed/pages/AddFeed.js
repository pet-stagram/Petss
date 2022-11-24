import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import { notifStyle } from "../../css/modalStyles";
import styles from "../../css/addFeed.module.css";
import ImageSlider, { Slide } from "react-auto-image-slider";
// import { Slide } from 'react-slideshow-image';

const AddFeed = ({setIsOpenAddFeed}) => {
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
                <WritePost files={imageFile} previews={previewImage} setIsOpenAddFeed={setIsOpenAddFeed}/>
            )}
        </>
    );
};

/**
 * AddFeed 컴포넌트의 step state가 1일 때 렌더링하는 컴포넌트
 * @param {Object} param0 
 */
const SelectImage = ({ setStep, setImageFile, setPreviewImage }) => {
    return (
        <div className={styles.selectImageBox}>
            <label className={styles.fileButton}  htmlFor="inputImage">
                이미지 파일을 선택하세요
            </label>
            <input
                type="file"
                name="inputImage"
                id="inputImage"
                accept="image/*"
                onChange={(e) => saveFileImage(e, setStep, setImageFile, setPreviewImage)}
                multiple
                style={{display:"none"}}
            />
        </div>
    );
};

/**
 * AddFeed 컴포넌트의 step state가 1이 아닐 때 렌더링하는 컴포넌트
 * previewImage를 출력하고, 서버에 제출할 수 있음
 * @param {Object} props 안녕 
 * @returns 
 */
const WritePost = ({ files, previews, setIsOpenAddFeed }) => {
  const [content, setContent] = useState("");
  const [isOpenErr, setIsOpenErr] = useState(false);

  const isCloseErr = () => {
    setIsOpenErr(false);
  }

  const isCloseAddFeed = () => {
    setIsOpenAddFeed(false);
  }
  /**
   * 다른 컴포넌트(SelectImage)에서 가져온 파일을 axios로 제출(POST)하기 위한 form handler function
   * @param {Event} e 피드 작성 폼을 제출했을 때 (onSubmit) 발생하는 이벤트
   */
  const formHandler = async(e) => {
    // files 받아온 부분..
      e.preventDefault();
      let formData = new FormData();

      files.map((file) => {
          formData.append("files", file);
      });
      
      formData.append("content", JSON.stringify(content));

    //   console.log(formData);
    //   for ( let key of formData.keys()) {
    //     console.log(formData.get(key));
    //   }
      

      await axios({
          method: "POST",
          url: `api/posts`,
          data: formData,
          withCredentials: true,
      })
          .then((result) => {
              console.log("성공");
              setIsOpenAddFeed(false);
          })
          .catch((err) => {
            // err.response.status === '401' 
              console.log("업로드 실패");
              setIsOpenErr(true);
          });
  }
  
  return (
      <div>
          <div className="previewImageWrap">
            <ImageSlider effectDelay={500} autoPlayDelay={10000} className={styles.imageSlider} width={400} height={400}>
                {
                    previews.map((preview, index) => {
                        
                        return(
                            <Slide key={index} >
                                <img className="previewImage" src={preview} alt="uploadImagePreview" style={{width: "650px", height: "650px"}}/>
                                
                            </Slide>    
                        )
                    })
                }                
            </ImageSlider>

            {/* ******************************************************************************* */}

            {/* <Slide>
            {previews.map((preview, index)=> {
                return(
                    <div className="each-slide" key={index}>
                        <div style={{'backgroundImage': `url(${preview})`}}>
                            <span>{preview.caption}</span>
                        </div>
                    </div>
                )})} 
            </Slide> */}
            
          </div>
          {/* image preview */}
          <form onSubmit={formHandler} encType="multipart/form-data">
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
                  <input type="submit" value="SUBMIT" style={{width:"100px"}}/>
              </div>
          </form>
           {
            isOpenErr&&
            <Modal
            isOpen={isOpenErr}
            onRequestClose={() => setIsOpenErr(false)}
            ariaHideApp={false}
            style={notifStyle}
            >
                <div style={{width:'100%', textAlign:"center", margin:"10px auto"}}>
                    <div>게시물 업로드에 실패했습니다.</div>
                    <button onClick={() => {isCloseErr(); isCloseAddFeed();}} style={{marginTop:"10px"}} >닫기</button>
                </div>
            </Modal>
           
           }
            
          
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
