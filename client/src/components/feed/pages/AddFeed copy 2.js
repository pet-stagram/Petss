import React from 'react';
import Modal from "react-modal";
import { useState } from 'react';
import axios from 'axios';

const AddFeed = () => {
  const [step, setStep] = useState(1);

  const arr = [];
  const [fileImage, setFileImage] = useState([]);
  const saveFileImage = (e, files) => {
      
      for(let i = 0; i < e.target.files.length ; i++){
        arr.push(URL.createObjectURL(e.target.files[i]));
      }
  
      let copy = [];
      for(let i = 0 ; i < arr.length; i++){
        copy.push(arr[i]);
        } 
        setFileImage([...copy,...fileImage]);   
        console.log(fileImage);
      setStep(2);
    }
  

  return (
    <>
    {
      step === 1 ? 
          <div>
          {fileImage && (
          <img src={fileImage} alt="sample" style={{width: "200px"}}/>
          )}
          <input type="file" name='choiceImage' accept='image/*' onChange={(e)=>saveFileImage(e,fileImage)} multiple/>
        </div>
        
       : <WritePost files={fileImage}/>
    }
    </>
  )
}



const WritePost = ({files}) => {

  const [content, setContent] = useState("");

  async function frmHandler(e) {
    e.preventDefault();

    let formData = new FormData();
    //formData.append(key, value);
    formData.append("content", content);
    formData.append("files", files);
  
    await axios.post("api/posts", formData).then((response) => {
      if (response.data.status === 201) {
        console.log("good")        
      } else {
        window.alert("Failed");
        
      }
    });
    // axios.post(주소, 값).then((response) => {주소를 처리 후에 작업할 내용})
    // then 은 계속 뒤에 이어서 추가해 쓸 수 있다.
  }
  return(
    <div>
        
      <form encType="multipart/form-data" onSubmit={frmHandler}>
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
    <img src={files} alt="" />
      
    </div>
  )
}

export default AddFeed;