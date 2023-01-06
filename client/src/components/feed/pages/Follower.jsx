import React from 'react'
import style from "../../css/Follower.module.css"
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Follower = ({followers}) => {
  // console.log(followers);
  return (
    <div>
        <h3 className={style.followerTitle}>팔로워</h3>
        <ul>
          {
          followers.map((follower) => {
            return(
              <li  className={style.followerList} key={follower.id}>
                <div className={style.profile}>
                  <img src={follower.image} alt="팔로워의 프로필사진" />
                </div>
                <Link to="" className={style.nickname}>{follower.nick}</Link>
                <span className={style.buttonWrap}>
                    <button>팔로우</button>
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

export default Follower