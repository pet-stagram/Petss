import React, { useEffect } from 'react';
import axios from 'axios';
import "../../css/mainFeed.css"
import test7 from "../../../images/7.jpg"
import paw from "../../../images/paw.png"
import reply from "../../../images/reply.png"
import message from "../../../images/message.png"
import { useState } from 'react';

const MainFeed = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
        const getFollowersFeed = async() => {
        await axios({
          method: "GET",
          url: `api/posts`,
          withCredentials: true,
      })
          .then((result) => {
              console.log("팔로워 피드 조회 성공");
              console.log("메인피드 데이터!!");
              console.log(result.data);
              setData(result.data);
              setIsLoading(true);
          })
          .catch((err) => {
            // err.response.status === '400' 
              console.log("팔로워 피드 조회 실패");
              console.log(err);
          });
    }
    
      useEffect(() => {
        getFollowersFeed();
      }, []);
  return (
      <main className='mainFeedWrap'>
            {
            isLoading &&
            data.map((feed)=>{
                return(
                    <div className="postBox">
                    <div className="userInfo">
                        <span className="userImage">
                            <img src={feed.User.image} alt="팔로잉 유저 프로필" />
                        </span>
                        <span className="nickname">{feed.User.nick}</span>
                    </div>
                    <div className="post">
                        <div className="postImageBox">
                            {feed.PostImages.map((postImage)=>{
                                return(
                                <img src={postImage.img_url} alt="postImages" className="postImage"/>
                                )
                            })} 
                        </div>
                        <div className="postReaction">
                            <button><img src={paw} alt="like" className="like"/></button>
                            <button><img src={reply} alt="like" className="like"/></button>
                            <button><img src={message} alt="like" className="like"/></button>
                        </div>
                        <p className='likeCount'>좋아요 {feed.Hearts.length} 개  </p>
                        <div className="postContent"> 
                            {feed.content}
                        </div>
                        
                    </div>
                </div>
                );
            })
            }
           
        </main>
  )
}

export default MainFeed