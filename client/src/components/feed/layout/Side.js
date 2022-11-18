import React from "react";
import "../../css/side.css";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-modal";


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
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [openedConversation, setOpenedConversation] = useState();
  useEffect(()=>{
    axios.get("api/chat/rooms").then((result)=>{
      setConversations([...conversations,...result.data]);
    });
  },[]);

  function getConversation(){
    let conversationId;
    conversations.map((conversation, index)=>{
      if(conversation.id===openedConversation){
       conversationId = conversation.id;
      }
  })
    axios.get(`/api/chat/message?conversation=${conversationId}`)
    .then((result)=>{
      const messages = result.data;
      console.log(messages);
      const partnerMessages = [];
      messages.map((message,index)=>{
        const partner= message.Receiver === null? message.Sender : message.Receiver;
        console.log(partner);
        // partnerMessages.push()
      })
      // const partner = result.data.Receiver === null?result.data.Sender:result.data.Receiver;
      // console.log(partner);
      // console.log(result.data);
    })
    .catch((result)=>{

    })
  }

  function goMessage(conversationId){
    setOpenedConversation(conversationId);
    setIsMessageOpen(true);
  }

  return (
    <div className="side">
    <h2>Message</h2>
    <div>
       {
        conversations.map((conversation, index)=>{
          /* conversation의 User1값이 null이면 User2가 상대방인 것임 */
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
    <Modal
            isOpen={isMessageOpen} 
            onAfterOpen={getConversation}
            onRequestClose={() => setIsMessageOpen(false)}
            ariaHideApp={false}
    >
      <div>
      {
          
      }
      </div>
    </Modal>
    </div>
  )
}

export default Side;
