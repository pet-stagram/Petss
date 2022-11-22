import { useRef , useState, useEffect } from "react";
import * as common from "../../module/commonFuncion";
import { useLocation, useParams } from "react-router-dom";
import MessageBox from './MessageBox';

function Messanger(props) {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState({});
    
    const { conversationId } = useParams();
    const location = useLocation();

    useEffect(() => {
        const fetchConversationDetail = async (conversationId) => {
            try {
                const messageResult = await common.getConversationDetail(
                    conversationId
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
                />
            )}
        </>
    );
}


export default Messanger;
