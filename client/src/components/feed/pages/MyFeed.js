import React, { useEffect } from 'react'
import "../../css/myFeed.css";
import image from "../../../images/6.jpg"
import axios from "axios";
import { useState } from 'react';
import Modal from "react-modal";
import Follower from './Follower';
import { followerStyle } from "../../css/modalStyles";

const MyFeed = () => {
  const [feedList, setFeedList] = useState([]);
  const [isOpenFollower, setIsOpenFollower] = useState(false);

  const getMyFeeds = async() => {
    const userId = 1;
    await axios({
      method: "GET",
      url: `api/users/${userId}/posts`,
      withCredentials: true,
  })
      .then((result) => {
          console.log("MyFeed 조회 성공");
          console.log(result.data);
          setFeedList(result.data);
      })
      .catch((err) => {
        // err.response.status === '400' 
          console.log("MyFeed 조회 실패");
      });
}

  useEffect(() => {
    getMyFeeds();
  }, []);

   return (
    <div className='myFeedWrap'>
        <header>
            <div className='myFeedProfileImage'></div>
            <section>
              <div className='myFeedProfile'>
                <span className='myFeedNickname'>츄츄와 예니</span>
                <button className='editPropile'>프로필 편집</button>
                {/* <span>설정아이콘 -> 설정으로 연결</span> */}
              </div>
              <ul className='myFeedInfo'>
                <li>게시물 12 개</li>
                <li onClick={() => setIsOpenFollower(true)}>팔로워 명</li>
                <Modal isOpen={isOpenFollower} onRequestClose={() => setIsOpenFollower(false)} ariaHideApp={false} style={followerStyle} >
                  <Follower/>
                </Modal>
                <li>팔로잉 352 명</li>
              </ul>
              <p className='introduction'>
                  자기소개를 작성해주세요.
              </p>
            </section>
        </header>
        <hr></hr>
        <div className='myFeedPostsWrap'>
          <h3 className='myFeedPostsTitle'>게시물</h3>

          <div className='myFeedPosts'>
            {feedList.length ===0 ? 
              <div>게시물이 없어요</div>
            :
              feedList.map((feed) => {
              return(
                <span key={feed.id} className='myFeedPost'>
                  <img src={feed.PostImages[0].img_url} alt='thumbnail'/>
                </span>
              )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default MyFeed