import React, { useEffect } from 'react'
import "../../css/myFeed.css";
import "../../css/reset.css";
import axios from "axios";
import { useState } from 'react';
import Modal from "react-modal";
import Follower from './Follower';
import { followerStyle } from "../../css/modalStyles";
import Following from './Following';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const MyFeed = () => {
  const [data, setData] = useState({});
  const [feedList, setFeedList] = useState([]);
  const [isReceiveData, setIsReceiveData] = useState(false);
  const [isOpenFollower, setIsOpenFollower] = useState(false);
  const [isOpenFollowing, setIsOpenFollowing] = useState(false);
  axios.defaults.withCredentials = true;

  const getMyInfo = async() => {
    const SESSION_ID = 1;
    await axios({
      method: "GET",
      url: `api/users/me`,
      // withCredentials: true,
  })
      .then((result) => {
          console.log("MyFeed 조회 성공");
          console.log(result.data);
          setData(result.data);       
          // feedList -> data 로 옮겨담기~~ 
          // data = 객체 
          // 동기안되나봄. 
          setFeedList(result.data.posts);
          setIsReceiveData(true);
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
      <>
      {isReceiveData ?  
          <div className='myFeedWrap'>
    <header>
        <div className='myFeedProfileImage'>
          <img src={data.info.image} alt='세션 로그인 유저 프로필'/>
        </div>
        <section>
          <div className='myFeedProfile'>
            {/* data.info.image 가 프로필사진 */}
            <span className='myFeedNickname'>{data.info.nick}</span>
            <button className='editPropile'><Link to="/edit">프로필 편집</Link></button>
            {/* <span>설정아이콘 -> 설정으로 연결</span> */}
          </div>
          <ul className='myFeedInfo'>
            <li>게시물 {data.postsCount} 개</li>
            <li onClick={() => setIsOpenFollower(true)}>
                팔로워 {data.followerCount} 명
              </li>
            <Modal isOpen={isOpenFollower} onRequestClose={() => setIsOpenFollower(false)} ariaHideApp={false} style={followerStyle} >
              <Follower followers={data.follower}/>
            </Modal>
            <li onClick={() => setIsOpenFollowing(true)}>팔로잉 {data.followingCount} 명</li>
            <Modal isOpen={isOpenFollowing} onRequestClose={() => setIsOpenFollowing(false)} ariaHideApp={false} style={followerStyle} >
              <Following followings={data.following}/>
            </Modal>
          </ul>
          <p className='introduction'>
              {data.info.self_intro}
              {/* data.info 를 지우니까 렌더에 문제는 없었음..
              504 GateWay..? */}
          </p>
        </section>
    </header>
    <hr></hr>
    <div className='myFeedPostsWrap'>
      <h3 className='myFeedPostsTitle'>게시물</h3>      
        {feedList.length ===0 ? 
          <div style={{textAlign:"center"}}>게시물이 없어요</div>
        :
        (
        <div className='myFeedPosts'>
          {feedList.map((feed) => {
          return(            
              <span key={feed.id} className='myFeedPost' onClick={() => console.log(feed)}>
                <img src={feed.PostImages[0].img_url} alt='thumbnail'/>
              </span>            
          )
          })}
        </div>
          )
        }          
    </div>
</div> 

: <div><Loading/></div>
      }
      </>
      
    )
}

export default MyFeed