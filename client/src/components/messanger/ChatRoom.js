import styles from "../../css/messanger.module.css";
import { useInView } from 'react-intersection-observer';
import { useState,useMemo, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import * as common from "../../module/commonFuncion";

function ChatRoom({messages, messageView, setMessages, conversationId, msgLength, setMsgLength}) {

    console.log(messages);
    const page = useRef(1);
    const [ref, inView] = useInView();
    
    const [length,setLength] = useState(0);
    const plusLength = () => {
        setLength(length+10);
        console.log(length);
    }
    
    const fetch = useCallback(async () => {
        try {
        const data = await common.getConversationDetail(conversationId, length);
 
        plusLength();
        setTimeout(() => {
            console.log(length);
        }, 1000);
        //   setHasNextPage(data.length === 10);
        //   if (data.length) {
        //     page.current += 1;
        //   }
        } catch (err) {
          console.error(err);
        }
      }, []);

    useEffect(() => {
        if (inView) {
          fetch();
        }
      }, [fetch, inView]);

  return (
    <div className={styles.chatRoom}>
        <div ref={ref} style={{ position: 'absolute', top: '0px' }} />
                {messages.chats.map((chat, index) => {
                    if (chat.senderId === messages.partner.id) {
                        return (
                            <div
                                className={styles.messageWrap}
                                key={chat.id}
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
                                key={chat.id}
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

               
            </div>
  )
}

export default ChatRoom