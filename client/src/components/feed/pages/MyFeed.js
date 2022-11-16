import React from 'react'
import "../css/myFeed.css";

const MyFeed = () => {
  return (
    <div className='myFeedWrap'>
        <header className='myFeedProfile'>
            <div className='myFeedProfileImage'></div>
            <section>
              <div>
                <span className='myFeedNickname'>츄츄와 예니</span>
                <button className='editPropile'>프로필 편집</button>
                <span>설정</span>
              </div>
              <ul>
                <li>게시물 12 개</li>
                <li>팔로워 346 명</li>
                <li>팔로잉 352 명</li>
              </ul>
              <div></div>
            </section>
        </header>
    </div>
  )
}

export default MyFeed