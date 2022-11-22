import React from 'react'
import ChatRoom from './ChatRoom';

import { useEffect, useState, useRef } from 'react';
import {joinChat, getSocket, sendSocketMessage } from "../../module/socketio";

const MessageBox = ({ messages, conversationId }) => {
    const scrollRef = useRef();

    const [messageView, setMessageView] = useState([]);
    const [conversation, setConversation] = useState(conversationId);
    const [room, setRoom] = useState("");

    useEffect(() => {
        joinChat(conversationId);
        setRoom(conversationId);
        
        setTimeout(()=>{
            scrollRef.current.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest'});
        },10)
        
        getSocket().on("reqMsg", (data) => {
            setMessageView((prevMsg) => [...prevMsg, data]);
            setTimeout(()=>{
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest'});
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
            id="chatting"
            style={{
                margin: "0 auto",
                display: "grid",
                gridTemplateRows: "5% 85% 10%",
                width: "80%",
            }}
            ref={scrollRef} 
        >
            <div
                style={{
                    position: "fixed",
                    width:"50%",
                    height:"70px",
                    top: "0",
                    background: "rgb(245, 245, 245)",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #ccc",
                    zIndex:"2",
                    
                }}
            >
                <img
                    src={messages.partner.image}
                    alt="상대방 이미지"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        margin: "20px 5px",
                    }}
                />
                <span>{messages.partner.name}</span>
            </div>
            <ChatRoom messages={messages} messageView={messageView}/>
            <div
                    className="sendWrap"
                    style={{
                        position: "fixed",
                        bottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        background: "white",
                        padding: "3px 2px",
                        display: "grid",
                        gridTemplateColumns: "90% 10%",
                        margin: "0 auto",
                        width: "50%",
                        height:"50px"
                    }}
                >
                    <input
                        type="text"
                        id="sendInput"
                        style={{
                            border: "none",
                            padding: "10px 0 10px 10px",
                            fontSize: "15px",
                        }}
                    />
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            color: "blue",
                            fontWeight: "700",
                            paddingRight: "8px",
                        }}
                        onClick={() => sendMessage(messages.partner)}
                    >
                        보내기
                    </button>
                </div>
        </div>
    );
};
export default MessageBox;
