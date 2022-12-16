import React from "react";
import { useRef , useState, useEffect, useContext } from "react";
import * as common from "../../module/commonFuncion";
import { useLocation, useParams } from "react-router-dom";
import MessageBox from './MessageBox';
import { useInView } from 'react-intersection-observer';

function Messanger(props) {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState({});
    
    const { conversationId } = useParams();
    const location = useLocation();
    const [msgLength, setMsgLength] = useState(0);
    const page = useRef(1);
    const [ref, inView] = useInView();
    const PAGE_ITEMS_COUNT = 10;
    useEffect(() => {
        const fetchConversationDetail = async (conversationId) => {
            try {
                const messageResult = await common.getConversationDetail(
                    conversationId, 0
                );
                setMessages({ ...messages, ...messageResult });
                setLoading(false);
            } catch (err) {
                if (err.response.status === 504) {
                    setLoading(true);
                    /* 504 에러 시 로딩화면 0.5초 출력한 뒤 다시 get 요청 */
                    setTimeout(() => {
                        fetchConversationDetail(conversationId);
                    }, 500);
                } else {
                    throw err;
                }
            }
        };
        fetchConversationDetail(conversationId);
    }, [location]);

    return (
        <>
            {loading ? (
                <h1>로딩중</h1>
            ) : (
                    <MessageBox
                        messages={messages}
                        conversationId={conversationId}
                        setMessages = {setMessages}
                        msgLength = {msgLength}
                        setMsgLength = {setMsgLength}
                    />
            )}
        </>
    );
}

export default Messanger;
