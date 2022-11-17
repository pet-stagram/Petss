import React from 'react';
import Modal from "react-modal";
import { useState } from 'react';
import axios from 'axios';

const AddFeed = () => {
  const [step, setStep] = useState(1);
  
  const [imageFile, setImageFile] = useState([]);
  const [previewImage,setPreviewImage] = useState([]);
  return (
    <>
    {
      step === 1 ? <SelectImage setStep={setStep} setImageFile={setImageFile} setPreviewImage = {setPreviewImage} /> : <WritePost files={imageFile} previews={previewImage}/>
    }
    </>
  )
}

const SelectImage = ({setStep, setImageFile, setPreviewImage})=>{
  return(
    <>
    <div>
          <input type="file" name='choiceImage' accept='image/*' onChange={(e)=>saveFileImage(e,setStep,setImageFile,setPreviewImage)} multiple/>
    </div>
    </>
  );
}

const saveFileImage = (e,setStep,setImageFile,setPreviewImage) => {
  console.log(e.target.files);
  const previewArr = [];
  const fileArr = Array.from(e.target.files);
  for(let i = 0; i < e.target.files.length ; i++){
    previewArr.push(URL.createObjectURL(e.target.files[i]));
  }
  setImageFile(prevArr => [...prevArr,...fileArr]);
  setPreviewImage(prevArr => [...prevArr,...previewArr]);
  setStep(2);
}

const stringToBlob = (files) =>{
  const myBlob = [];
  files.map((file)=>{
    myBlob.push(new Blob([file],{type: 'image/*'}));
  });
  return myBlob;
}

const WritePost = ({files, previews}) => {
  const [content, setContent] = useState("");
  async function frmHandler(e) {
    e.preventDefault();
    let formData = new FormData();
    //formData.append(key, value);
    console.log(files);
    
    files.map((file)=>{
      formData.append("files", file);
    });
    formData.append("content",JSON.stringify(content));
    
    await axios({
      method: "POST",
      url:`api/posts`,
      data:formData
    }).then(()=>{
      console.log("성공");
    }).catch(()=>{

    })
    
  }
  return(
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
      <div style={{display:"flex"}}>
    {
      previews.map((preview,index)=>{
        return(
            <img src={preview} alt="" key={index} style={{width:"400px", margin:"10px 20px"}}/>
        );
      })
    }
    </div>
      
    </div>
  )
}

export default AddFeed;