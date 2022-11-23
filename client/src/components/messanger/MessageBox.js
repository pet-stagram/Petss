import React from 'react'
import ChatRoom from './ChatRoom';
import styles from "../../css/messanger.module.css";
import { useEffect, useState, useRef } from 'react';
import {joinChat, getSocket, sendSocketMessage, receiveMessage } from "../../module/socketio";

const MessageBox = ({ messages, conversationId }) => {
    const scrollRef = useRef();

    const [messageView, setMessageView] = useState([]);
    const [conversation, setConversation] = useState(conversationId);
    const [room, setRoom] = useState("");

    useEffect(() => {
        joinChat(conversationId);
        setRoom(conversationId);
        
        setTimeout(()=>{
            scrollRef.current.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest"});
        },10)
        getSocket().on("reqMsg", (data) => {
            setMessageView((prevMsg) => [...prevMsg, data]);
            setTimeout(()=>{
                console.log(messageView);
                scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});
            }
            ,100)
            
        });
        /* 대화바뀔 때마다 message가 담긴 state 초기화 */
        setMessageView([]);
        
    }, [conversationId]);

    const sendMessage = (partner) => {
        const content = document.querySelector("#sendInput");
        try {
            const messageInfo = {
                conversation,
                content,
                sender: "me",
                partner: partner.id,
                me: 1, //세션
            };
            sendSocketMessage(messageInfo);
            setTimeout(() => {
                content.value = "";
                
            }, 10);
            
        } catch (err) {
            throw err;
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
                        src={messages.partner.image}
                        alt="상대방 이미지"/>
                    <span>{messages.partner.name}</span>
                
            </div>
            <ChatRoom messages={messages} messageView={messageView}/>
            <div className={styles.sendWrap}>
                    <input
                        type="text"
                        id="sendInput"
                        className={styles.sendInput}/>
                    <button className={styles.sendButton} onClick={() => sendMessage(messages.partner)}>
                        보내기
                    </button>
                </div>
        </div>
    );
};
export default MessageBox;
