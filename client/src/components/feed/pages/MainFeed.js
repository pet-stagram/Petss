import React, { useEffect } from 'react';
import axios from 'axios';
import "../../css/mainFeed.css"
import "../../css/reset.css";
import test7 from "../../../images/7.jpg"
import paw from "../../../images/paw.png"
import emptyPaw from "../../../images/empty_paw.png"
import reply from "../../../images/reply.png"
import message from "../../../images/message.png"
import { useState } from 'react';

const MainFeed = () => {
    const SESSION_ID = 1;
    const [posts, setPosts] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [feedImageList, setFeedImageList] = useState([]);
    const [scrollState, setScrollState] = useState(0);
    // const [isLiked, setIsLiked] = useState()
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
              setPosts(result.data);
              setIsLoading(true);
              setFeedImageList(posts.PostImages);
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

      const handleLikeClick = async(postId) => {
        console.log(postId);
        
        await axios({
            method: "PUT",
            url: `api/posts/like/${postId}`,
            withCredentials: true,
        })
        .then((likeResult) => {
            console.log(likeResult);
            
          })
          .catch((err) => {
              console.log(err);
          });
      }
    
      let count = 0;
      const nextButton = () => {
        count = feedImageList.length-1 === count ? 0 : count+1;
        setScrollState("-"+count*100+"%")
      }
      const prevButton = () => {
        count = count === 0 ? feedImageList.length-1 : count-1
        setScrollState("-"+count*100+"%")
      }


  return (
      <main className='mainFeedWrap'>
        {posts === ""? <div>No Data</div> : 
            
            isLoading &&
            posts.map((post)=>{
                return(
                    <div className="postBox" key={post.id}>
                    <div className="userInfo">
                        <span className="userImage">
                            <img src={post.User.image} alt="팔로잉 유저 프로필" />
                        </span>
                        <span className="nickname">{post.User.nick}</span>
                    </div>
                    <div className="post">
                        <div className="postImageBox">
                            <ul className='FeedUl'>
                                {post.PostImages.map((postImage)=>{
                                return(
                                    <li className='FeedLi'>
                                        <img src={postImage.img_url} alt="postImages" className="postImage" 
                                        style={{backgroundImage: "url('"+scrollState+"')"}}/>
                                    </li>
                                )
                                })} 
                            </ul>
                            
                            {/* <img src={post.PostImages[0].img_url} alt="postImages" className="postImage"/> */}
                            
                        </div>
                        <div>
                            <button onClick={prevButton}>left</button>
                            <button onClick={nextButton}>right</button>
                        </div>
                        <div className="postReaction">
                            <button onClick={()=>handleLikeClick(post.id)}>
                                <img src={
                                    post.Hearts.length===0 ? emptyPaw : paw
                                } alt="like" className="like"/>
                            </button>
                            <button><img src={reply} alt="like" className="like"/></button>
                            <button><img src={message} alt="like" className="like"/></button>
                        </div>
                        <p className='likeCount'>좋아요 {post.Hearts.length} 개  </p>
                        <div className="postContent"> 
                            {post.content}
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