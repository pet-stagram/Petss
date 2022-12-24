import React, { useState } from 'react'
import axios from 'axios';
import paw from "../../../images/paw.png"
import emptyPaw from "../../../images/empty_paw.png"
import reply from "../../../images/reply.png"
import message from "../../../images/message.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight,  } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import Comment from './Comment';
import styles from "../../css/post.module.css";
import { replyStyle } from '../../css/modalStyles';


const Post = ({post}) => {
    const [count, setCount] = useState(0);
    const [replyOpen, setReplyOpen] = useState(false);
    

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
        // console.log(postId);
        
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
        <div className={styles.postBox} key={post.id}>
            <div className={styles.userInfo}>
                <span className={styles.userImage}>
                    <img src={post.User.image} alt="following user profile" />
                </span>
                
                <span className={styles.nickname}>{post.User.nick}</span>
            </div>
             {/************************************************************************/}
            <div >
                <div className={styles.post}>
                    <button onClick={()=>handlePrev(post)} className={styles.imageButton}><FontAwesomeIcon icon={faAngleLeft}/></button>
                    <div className={styles.postImageBox} style={{backgroundImage: "url('"+post.PostImages[count]?.img_url+"')"}}></div>
                    <button onClick={()=>handleNext(post)} className={styles.imageButton}><FontAwesomeIcon icon={faAngleRight}/></button>
                </div>
                <div style={{padding:"0 20px"}}>
                    <div className={styles.postReaction}>
                        <button onClick={()=>handleLikeClick(post.id)}>
                            <img src={post.Hearts.length===0 ? emptyPaw : paw} alt="like" className={styles.like}/>
                        </button>
                        <button onClick={() => setReplyOpen(true)}><img src={reply} alt="like" className={styles.like}/></button>
                            <Modal
                            isOpen={replyOpen}
                            onRequestClose={() => setReplyOpen(false)}
                            ariaHideApp={false}
                            style={replyStyle}
                            >
                            <Comment postId={post.id}/>
                        </Modal>
                        <button><img src={message} alt="like" className={styles.like}/></button>
                    </div>
                    <p className='likeCount'>좋아요 {post.Hearts.length} 개                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </p>
                    <div className={styles.postContent}> 
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post
