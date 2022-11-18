import React from 'react';
import Modal from "react-modal";
import { useState } from 'react';
import axios from 'axios';

const AddFeed = () => {
  const [step, setStep] = useState(1);
  const [fileImage, setFileImage] = useState('');
      
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