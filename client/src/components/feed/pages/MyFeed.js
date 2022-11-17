import React from 'react'
import "../../css/myFeed.css";
import image from "../../../images/6.jpg"

const MyFeed = () => {
  return (
    <div className='myFeedWrap'>
        <header>
            <div className='myFeedProfileImage'></div>
            <section>
              <div className='myFeedProfile'>
                <span className='myFeedNickname'>츄츄와 예니</span>
                <button className='editPropile'>프로필 편집</button>
                {/* <span>설정</span> */}
              </div>
              <ul className='myFeedInfo'>
                <li>게시물 12 개</li>
                <li>팔로워 346 명</li>
                <li>팔로잉 352 명</li>
              </ul>
              <p className='introduction'>
                  자기소개를 작성해주세요.
              </p>
            </section>
        </header>
        <hr></hr>
        <div className='myFeedPostsWrap'>
          <div className='myFeedPostsTitle'>게시물</div>
          <div className='myFeedPosts'>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
            <span className='myFeedPost'><img src={image} alt=''/></span>
          </div>
        </div>
    </div>
  )
}

export default MyFeed