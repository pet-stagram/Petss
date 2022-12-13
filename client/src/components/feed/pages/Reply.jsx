import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Reply = ({ postId }) => {
  // TODO : 이미지슬라이드 크기 조절 & 순서,번호 표시 가능 시 게시물 사진도 같이 보여주기.
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();


  const getComments = async(postId) => {
    console.log(postId);

    await axios({
        method:"GET",
        url: `api/posts/comment/${postId}`,
        withCredentials: true,
    }).then((comments) => {
        console.log(comments);
        setComments(comments.data);
    }).catch((err)=>{
        console.log(err);
    })
    }

  const handleAdd = async () => {
    //e.preventDefault(); //submit 기본동작 페이지 새로고침x
    await axios
      .post('api/posts/comment', {postId, content:text}
      )
      .then(()=>{setText('')})
      // ()=>console.log("ok")
      .catch(console.error);
  };

  useEffect(()=>{
    getComments(postId);
  },[])

  return (
    <div>
       <ul>
        {
          comments.map((comment)=>{
            return(
            <li>{comment.content}</li>
            )
          })
        }
       </ul>
      <form action="">
        <input
          type='text'
          name='writeReply'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></input>
        <input type='button' name='writeReplyBtn' value='작성' onClick={handleAdd}></input>
      </form>
    </div>
  );
};

export default Reply;
