import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from "../../css/comment.module.css"

const Comment = ({ postId }) => {
  // TODO : 이미지슬라이드 크기 조절 & 순서,번호 표시 가능 시 게시물 사진도 같이 보여주기.
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();


  const getComments = async() => {
    await axios({
        method:"GET",
        url: `api/posts/comment/${postId}`,
        withCredentials: true,
    }).then((comments) => {
        console.log(comments.data);
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
      .then(()=>{
        setText('');
        getComments();
      })
      .catch(console.error);
  };

  useEffect(()=>{
    getComments();
  },[comments.length])

  return (
    <div>
       <ul>
        {
          comments.map((comment)=>{
            return(
            <li className={styles.userInfo}>
                <span className={styles.userImage}><img src={comment.User.image} alt="user_imag" /></span>
                <span>{comment.User.nick}</span>
                <span>{comment.content}</span>
            </li>
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

export default Comment;
