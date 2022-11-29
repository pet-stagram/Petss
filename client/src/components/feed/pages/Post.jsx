import React, { useState } from 'react'
import axios from 'axios';
import paw from "../../../images/paw.png"
import emptyPaw from "../../../images/empty_paw.png"
import reply from "../../../images/reply.png"
import message from "../../../images/message.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faAngleLeft, faChevronRight, faAngleRight,  } from "@fortawesome/free-solid-svg-icons";


const Post = ({post}) => {
    const [count, setCount] = useState(0);

    const handlePrev = (post) => {
        setCount(() => (count === 0 ? post.PostImages.length - 1 : count - 1));
        // 이미지가 3개라면,  카운트 === 0 이면 3-1 , 아니면 1-1, 2-1, 3-1 ? 
        console.log(count);
        console.log(post);
      }
      const handleNext = (post) => {
        setCount(() => (post.PostImages.length - 1 === count ? 0 : count + 1));
        console.log(count);
        console.log(post);
      }
      
    /////////////////////////////////////////////////////////////////////////////////

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

  return (
    <div>
        <div className="postBox" key={post.id}>
            <div className="userInfo">
                <span className="userImage">
                    {/* <img src={post.User.image} alt="팔로잉 유저 프로필" /> */}
                </span>
                
                <span className="nickname">{post.User.nick}</span>
            </div>
             {/************************************************************************/}
            <div >
                <div className="post">
                    <button onClick={()=>handlePrev(post)} className="imageButton"><FontAwesomeIcon icon={faAngleLeft}/></button>
                    <div className="postImageBox" style={{backgroundImage: "url('"+post.PostImages[count]?.img_url+"')"}}></div>
                    <button onClick={()=>handleNext(post)} className="imageButton"><FontAwesomeIcon icon={faAngleRight}/></button>
                </div>
                <div style={{padding:"0 20px"}}>
                    <div className="postReaction">
                        <button onClick={()=>handleLikeClick(post.id)}>
                            <img src={post.Hearts.length===0 ? emptyPaw : paw} alt="like" className="like"/>
                        </button>
                        <button><img src={reply} alt="like" className="like"/></button>
                        <button><img src={message} alt="like" className="like"/></button>
                    </div>
                    <p className='likeCount'>좋아요 {post.Hearts.length} 개                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </p>
                    <div className="postContent"> 
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post
