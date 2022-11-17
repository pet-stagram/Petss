import React from 'react'
import "../../css/side.css"
import { useEffect, useState } from 'react';
import axios from 'axios';



const Side = () => {
  
  const [conversations, setConversations] = useState([]);

  useEffect(()=>{
    axios.get("api/chat/rooms").then((result)=>{
      result.data.map((data)=>{
        setConversations([...conversations, data]);
      });
    });
  },[]);
  console.log(conversations);
  
  return (
    <div className="side">
    <h2>Message</h2>
    <div>
       {
        conversations.map((conversation, index)=>{
          const friend = conversation.User1===null?conversation.User2:conversation.User1;
          return(
        <div className="messageUserInfo" key={index}>
          <img src={friend.image} alt="친구 프로필사진" className="friendImg"/>
          <span>{friend.name}</span>
          안녕
          </div>
          );
          
        })
       }
        <button className='testBtn'>Message</button>
    </div>
    </div>
  )
}

export default Side