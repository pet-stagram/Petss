import React, { useEffect } from 'react'
import "../../css/myFeed.css";
import image from "../../../images/7.jpg"
import axios from "axios";
import { useState } from 'react';
import Modal from "react-modal";
import Follower from './Follower';
import { followerStyle } from "../../css/modalStyles";

const MyFeed = () => {
  const [data, setData] = useState({});
  const [feedList, setFeedList] = useState([]);

  const getMyInfo = async() => {
    const userId = 1;
    await axios({
      method: "GET",
      url: `api/users/${userId}/posts`,
      withCredentials: true,
  })
      .then((result) => {
          console.log("MyFeed 조회 성공");
          setData(result.data);
          // feedList -> data 로 옮겨담기~~ 
          // data = 객체 
          // 동기안되나봄. 
          setFeedList(result.data.posts);
          console.log(result.data);
          setFeedList(result.data);
      })
      .catch((err) => {
        // err.response.status === '400' 
          console.log("MyFeed 조회 실패");
          console.log(err);
      });
}

  useEffect(() => {
    getMyInfo();
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