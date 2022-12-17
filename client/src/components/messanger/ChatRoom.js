import styles from "../../css/messanger.module.css";
import { useInView } from 'react-intersection-observer';
import { useState,useMemo, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import * as common from "../../module/commonFuncion";

function ChatRoom({messages, messageView, setMessages, conversationId, msgLength, setMsgLength}) {
    const page = useRef(1);
    const [ref, inView] = useInView();
    const chatContainer = useRef(null);
    const [loading, setLoading] = useState(false);
    const [length,setLength] = useState(0);
    const plusLength = () => {
        setLength(length+10);
    }
    const messagesEndRef = useRef();

    const fetch = async () => {
        try {
        setLoading(true);
        const data = await common.getConversationDetail(conversationId, length);
        if(data.chats.length===0){
            console.log("없음")
        }else{
            plusLength();
            setLoading(false);
        }
        } catch (err) {
          console.error(err);
        }
      };

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView();
    },[messageView]);

    useEffect(() => {
        if (inView) {
          fetch();
        }
      }, [inView]);

  return (
    <div className={styles.chatRoom} ref={chatContainer}>
        <div ref={ref} style={{ position: 'absolute', top: '0px' }} />
                {messages.chats.map((chat, index) => {
                    if (chat.senderId === messages.partner.id) {
                        return (
                            <div
                                className={styles.messageWrap}
                                key={index}
                            >
                                <span className={styles.message}>
                                    {chat.content}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                className={styles.messageWrap}
                                key={index}
                            >
                                <span className={`${styles.message} ${styles.myMsg}`}
                                >
                                    {chat.content}
                                </span>
                            </div>
                        );
                    }
                })}
                {messageView.map((message,index) => {
                    if (message.sender === "me") {
                        return (
                            <div
                                className={`${styles.newMessage} ${styles.myNewMsg}`}
                                key={index}
                            >
                                <span className={`${styles.message} ${styles.myMsg}`}>
                                    {message.comment}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                className={styles.newMessage}
                                style={{ width: "100%", display: "flex" }}
                                key={index}
                            >
                                <span className={styles.message}>
                                    {message.comment}
                                </span>
                            </div>
                        );
                    }
                })}

                <div ref={messagesEndRef}></div>
    </div>
  )
}

export default ChatRoom