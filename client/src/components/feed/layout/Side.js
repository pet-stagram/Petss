import React from "react";
import "../../css/side.css";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";



const Side = () => {
  const FriendImg = styled.div`
    background-size:40px 40px;
    background-repeat:no-repeat;
    border-radius:50%;
    width:40px;
    height:40px;
    margin-right :10px;
  `;
  const ReadNotification = styled.div`
    width:10px;
    height:10px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    right:20px;
  `;
  const [conversations, setConversations] = useState([]);

  useEffect(()=>{
    axios.get("api/chat/rooms").then((result)=>{
      setConversations([...conversations,...result.data]);
      
    });
  },[]);
  console.log(conversations);
  function goMessage(conversationId){
    console.log(conversationId+"메시지로 이동하기");
  }
  return (
    <div className="side">
    <h2>Message</h2>
    <div>
       {
        conversations.map((conversation, index)=>{
          const isMessageRead = conversation.User1===null?conversation.user1Read:conversation.user2Read;
          const friend = conversation.User1===null?conversation.User2:conversation.User1;
          return(
        <div className="messageInfo" key={index} onClick={()=>goMessage(conversation.id)}>
          <FriendImg style = {{backgroundImage:`url(${friend.image})`}}alt="친구 프로필사진"></FriendImg>
          <div>
            <h4 style={{fontWeight: 700, marginBottom:"5px"}}>{friend.name}</h4>
            <p style={{fontSize : "0.8em"}}>{conversation.lastChat}</p>
          </div>
          {/* 안 읽었으면 ReadNotification이 출력되게 ( 빨간색 원 ) */}
          {isMessageRead||<ReadNotification/>}
        </div>
          );
          
        })
       }
        <button className='testBtn'>Message</button>
    </div>
    </div>
  )
}

export default Side;
