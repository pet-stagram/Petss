import React from 'react'
import style from "../../css/Follower.module.css"
import { Link } from 'react-router-dom';

const Follower = () => {
  return (
    <div>
        <h3 className={style.followerTitle}>팔로워</h3>
        <div className={style.followerList}>
            <div className={style.profile}></div>
            <Link to="" className={style.nickname}>츄츄와 예니</Link>
            <span className={style.buttonWrap}>
                <button>팔로우</button>
                <button>삭제</button>
            </span>
        </div>
    </div>
  )
}

export default Follower