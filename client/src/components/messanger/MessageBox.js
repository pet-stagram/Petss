import React from 'react'
import ChatRoom from './ChatRoom';
import styles from "../../css/messanger.module.css";
import { useEffect, useState, useRef } from 'react';
import { useUserState } from '../../ContextProvider';
import {joinChat, getSocket, sendSocketMessage, receiveMessage } from "../../module/socketio";

const MessageBox = ({ messages, conversationId, setMessages, msgLength, setMsgLength }) => {
    const scrollRef = useRef();
    const [user,setUser] = useUserState();
    const [messageView, setMessageView] = useState([]);
    const [conversation, setConversation] = useState(conversationId);
    const [room, setRoom] = useState("");
    
    useEffect(() => {
        joinChat(conversationId);
        setRoom(conversationId);
        getSocket().on("reqMsg", (data) => {
            setMessageView((prevMsg) => [...prevMsg, data]);
        });
        /* 대화바뀔 때마다 message가 담긴 state 초기화 */
        setMessageView([]);
    }, []);
    
    const sendMessage = (partner) => {
        const content = document.querySelector("#sendInput");
        if(content.value !== ""){
        try {
            const messageInfo = {
                conversation,
                content,
                partner: partner.id,
                me: user?.info?.id, //세션
            };
            sendSocketMessage(messageInfo);
            setTimeout(() => {
                content.value = "";
            }, 10);
            
        } catch (err) {
            throw err;
        }
    }
    };

    return (
        <div
            className={styles.chatting}
            ref={scrollRef} 
        >
            <div className={styles.partnerWrap}>
                    {/* 이미지 클릭 시 상대방 프로필 가기 */}        
                    <img
                        className={styles.partnerImage}
                        src={messages?.partner?.image}
                        alt="상대방 이미지"/>
                    <span>{messages?.partner?.nick}</span>
                
            </div>
            <ChatRoom messages={messages} messageView={messageView} setMessageView={setMessageView} setMessages={setMessages} conversationId ={conversationId} msgLength = {msgLength} setMsgLength = {setMsgLength}/>
            <div className={styles.sendWrap}>
                    <input
                        type="text"
                        id="sendInput"
                        className={styles.sendInput}
                        onKeyPress={()=>sendMessage(messages?.partner)}
                        />
                    <button className={styles.sendButton} onClick={() => sendMessage(messages?.partner)}>
                        보내기
                    </button>
                </div>
        </div>
    );
};
export default MessageBox;
