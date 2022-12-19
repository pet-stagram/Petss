import styles from "../../css/messanger.module.css";
import { useInView } from 'react-intersection-observer';
import { useState,useMemo, useEffect, useCallback, useRef } from "react";
import * as common from "../../module/commonFuncion";
import { useUserState } from '../../ContextProvider';

function ChatRoom({messages, messageView, setMessages, conversationId, msgLength, setMsgLength}) {
    const page = useRef(1);
    const [ref, inView] = useInView();
    const chatContainer = useRef(null);
    const [loading, setLoading] = useState(false);
    const [hasMore , setHasMore]= useState(true);
    const messagesEndRef = useRef();
    const [user,setUser] = useUserState();    

    const fetch = async () => {
        try {
        setLoading(true);
        const lastId= messages.chats[messages.chats.length - 1]?.id;
        const data = await common.getConversationDetail(conversationId, lastId);
        if(data.chats.length===0){
            setHasMore(false);
        }else{
            setHasMore(true);
            const copy = {...messages};
            copy.chats.push(...data.chats);
            setMessages(copy);
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
        if (inView&&hasMore) {
          fetch();
        }
      }, [inView]);

  return (
    <div className={styles.chatRoom} ref={chatContainer}>
        <div ref={ref} style={{ position: 'absolute', top: '0px' }} />
                {messages.chats.slice().reverse().map((chat, index) => {
                    if (chat.senderId === user?.info?.id) {
                        return (
                            <span className={`${styles.messageWrap} ${styles.myMsgWrap}`} key={index}>
                                <span className={`${styles.message} ${styles.myMsg}`}>
                                    {chat.content}
                                </span>
                            </span>
                        );
                    } else {
                        return (
                            <span className={`${styles.messageWrap}  ${styles.partnerMsgWrap}`} key={index}>
                                <span className={`${styles.message} ${styles.partnerMsg}`}>
                                    {chat.content}
                                </span>
                            </span>
                        );
                    }
                })}
                {messageView.map((message,index) => {
                    if (message.sender === user?.info?.id) {
                        return (
                            <span className={`${styles.messageWrap} ${styles.myMsgWrap}`} key={index}>
                                <span className={`${styles.message} ${styles.myMsg}`}>
                                    {message.comment}
                                </span>
                            </span>
                        );
                    } else {
                        return (
                            <span className={`${styles.messageWrap} ${styles.partnerMsgWrap}`} key={index}>
                                <span className={`${styles.message} ${styles.partnerMsg}`}>
                                    {message.comment}
                                </span>
                            </span>
                        );
                    }
                })}

                <div ref={messagesEndRef}></div>
    </div>
  )
}

export default ChatRoom