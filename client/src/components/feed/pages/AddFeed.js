import React from 'react';
import Modal from "react-modal";
import { useState } from 'react';

const AddFeed = () => {
  const [form, setForm] = useState({image:'', content:''});
  const [step, setStep] = useState(1);

const formHandler = (e) => {
  e.preventDefault();
  console.log(form);
};

const handleChange = (e) => {
  const {name, value} = e.target;
  setForm({...form, [name]: value});
};

  return (
    <>
      {step === 1 ? <choiceImage/> : <writePost/>}
    </>
  )
}

const choiceImage = () => {
  return(
    <div>
      <input type="file" name='postImage' />
    </div>
  )
}

const writePost = () => {
  return(
    <div>
      <form method='post' encType="multipart/form-data" onSubmit={formHandler}>
        <div>
          <img src="" alt="getChoiceImage" value={form.image} onChange={handleChange}/>
        </div>
        <div>
          <textarea cols='5' rows='5' name='writeContent' value={form.content} onChange={handleChange}></textarea>
        </div>
      </form>
    </div>
  )
}

export default AddFeed;