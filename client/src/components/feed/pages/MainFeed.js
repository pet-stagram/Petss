import React, { useEffect } from 'react';
import axios from 'axios';
import "../../css/mainFeed.css"
import "../../css/reset.css";
import { useState } from 'react';
import Post from './Post';

const MainFeed = () => {
    const SESSION_ID = 1;
    const [posts, setPosts] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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
        {posts === ""? <div>No Data</div> : 
            
            isLoading &&
            posts.map((post)=>{
                return(
                    <Post post={post}/>
                );
            })
          } 
      </main>
  )
}

export default MainFeed

