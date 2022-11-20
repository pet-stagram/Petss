import { useState, useEffect } from "react";
import * as common from "../../module/commonFuncion";
import { useLocation, useParams } from "react-router-dom";

function Messanger(props) {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState({});
    const { conversationId } = useParams();
    const location = useLocation();

    // const conversationId = location.pathname.split("/")[2];

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
                <MessageBox messages={messages}></MessageBox>
            )}
        </>
    );
}

const MessageBox = ({ messages }) => {
    console.log(messages);
    return (
        <div id="chatting">
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
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
                {messages.chats.map((chat) => {
                    if (chat.senderId === messages.partner.id) {
                        return (
                            <div className="chatWrap" style={{width:"100%", display:"block"}}>
                                <span
                                    style={{
                                        backgroundColor: "white",
                                        border: "1px solid #eee",
                                        padding: "12px 15px",
                                        margin: "12px 20px",
                                        borderRadius:"20px"
                                    }}
                                >
                                    {chat.content}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div className="chatWrap" style={{width:"100%", display :"inline-block"}}>
                                <span
                                    style={{
                                        backgroundColor: "#ccc",
                                        border: "1px solid #eee",
                                        padding: "12px 15px",
                                        margin: "12px 20px",
                                        float: "right",
                                        borderRadius:"20px"
                                    }}
                                >
                                    {chat.content}
                                </span>
                            </div>
                        );
                    }
                })}
            </div>
            
        </div>
    );
};
export default Messanger;
