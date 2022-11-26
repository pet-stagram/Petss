import React from 'react'
import style from "../../css/Follower.module.css"
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Following = ({followings}) => {
//   console.log(followings);
  return (
    <div>
        <h3 className={style.followerTitle}>팔로잉</h3>
        <ul>
          {
          followings.map((following) => {
            return(
              <li  className={style.followerList} key={following.id}>
                <div className={style.profile}>
                  <img src={following.image} alt="팔로워의 프로필사진" />
                </div>
                <Link to="" className={style.nickname}>{following.nick}</Link>
                <span className={style.buttonWrap}>
                    <button style={{backgroundColor:"lightgray"}}>팔로잉</button>
                    <button>삭제</button>
                </span>
              </li>
            )
          })
          }
            
        </ul>
    </div>
  )
}

export default Following