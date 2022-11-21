import { useState, useEffect } from "react";
import * as common from "../../module/commonFuncion";
import { useLocation, useParams } from "react-router-dom";
import { socket, getSocket, joinChat, receiveMessage, sendSocketMessage } from '../../module/socketio';
import { io } from 'socket.io-client';


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
                <MessageBox messages={messages} conversationId={conversationId}></MessageBox>
            )}
        </>
    );
}

const MessageBox = ({ messages, conversationId }) => {
    const [messageView, setMessageView] = useState([]);
    const [conversation, setConversation ] = useState(conversationId);   
    const [room, setRoom] = useState("");
    
   
      
    useEffect(()=>{
        joinChat(conversationId);
        setRoom(conversationId);
        getSocket().on("reqMsg", (data) => {  
            setMessageView((prevMsg)=>[...prevMsg,data]);
     
          }
        );
        /* 대화바뀔 때마다 message가 담긴 state 초기화 */
        setMessageView([]);
    },[conversationId]);
    
    const sendMessage = (partner) => {
        const content = document.querySelector("#sendInput");
        try{
            const messageInfo = {
                conversation,
                content,
                sender : "me",
                partner: partner.id,
                me : 1//세션
            }
            sendSocketMessage(messageInfo);
            setTimeout(()=>{
                content.value="";
            },10);
            
        }catch(err){
            throw err;
        }
    }

    return (
        <div id="chatting" style={{margin:"0 50px",display:"grid",gridTemplateRows:"10% 80% 10%"}}>
            
                <div style={{ display: "flex", alignItems: "center", borderBottom : "1px solid #ccc" }}>
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
                <div className="chatRoom" style={{margin:"30px 0"}}>
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
                {
                    messageView.map((message)=>{
                        if(message.sender==="me"){
                            return (
                                <div className="chatWrap" style={{width:"100%", display:"flex",justifyContent: "end"}}>
                                    <span
                                        style={{
                                            backgroundColor: "#ccc",
                                            border: "1px solid #eee",
                                            padding: "12px 15px",
                                            margin: "12px 20px",
                                            borderRadius:"20px"
                                        }}
                                    >
                                        {message.comment}
                                    </span>
                                </div>
                            );
                        }else{
                            return (
                                <div className="chatWrap" style={{width:"100%", display:"flex"}}>
                                    <span
                                        style={{
                                            backgroundColor: "white",
                                            border: "1px solid #eee",
                                            padding: "12px 15px",
                                            margin: "12px 20px",
                                            borderRadius:"20px"
                                        }}
                                    >
                                        {message.comment}
                                    </span>
                                </div>
                            );
                        }
                        
                    })
                }
                </div>
            
            <div >
                    <div className="sendWrap" style={{margin:"0 auto"}}>
                        <div style={{border:"1px solid #ccc",borderRadius:"10px",background:"white", padding:"3px 2px",display:"grid", gridTemplateColumns:"90% 10%"}}>
                            <input type="text" id="sendInput" style={{border:"none",padding:"10px 0 10px 10px",fontSize:"15px"}}/>
                            <button style={{background:"none", border:"none", color:"blue",fontWeight:"700",paddingRight:"8px"}} onClick={()=>sendMessage(messages.partner)}>보내기</button>
                        </div>
                    </div>
            </div>
        </div>
    );
};
export default Messanger;
