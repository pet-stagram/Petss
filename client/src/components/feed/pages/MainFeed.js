import React from 'react';
import axios from 'axios';
import "../css/mainFeed.css"
import test7 from "../../../images/7.jpg"
import paw from "../../../images/paw.png"
import reply from "../../../images/reply.png"
import message from "../../../images/message.png"

const MainFeed = () => {
  return (
      <main className='mainFeedWrap'>
            <div className="postBox">
                <div className="userInfo">
                    <span className="userImage"></span>
                    <span className="nickname">츄츄와 예니</span>
                </div>
                <div className="post">
                    <div className="postImageBox">
                        <img src={test7} alt="" className="postImage"/>
                    </div>
                    <div className="postReaction">
                        <button><img src={paw} alt="like" className="like"/></button>
                        <button><img src={reply} alt="like" className="like"/></button>
                        <button><img src={message} alt="like" className="like"/></button>
                    </div>
                    <p className='likeCount'>좋아요  287 개  </p>
                    <div className="content"> 
                        포니랑 오늘 2시에 공원에서 만나 같이 뛰어놀았는데 너무 재밌었다! 또 놀아야징ㅎ 
                        예니가 맛있는 간식을 포니와 나에게 주었다! 존맛탱!
                        예니도 포니를 만나면 즐거워한다 ㅎㅅㅎ 친구들이랑 노는 것은 언제나 즐겁다!
                    </div>
                    
                </div>
            </div>
        </main>
  )
}

export default MainFeed