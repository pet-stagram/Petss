import React from "react";
import "../../css/side.css";
import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import * as common from "../../../module/commonFuncion";
import { getSocket } from '../../../module/socketio';

const Side = () => {

    const [conversations, setConversations] = useState([]);
    const [messageDto, setMessageDto] = useState({});
    const [reload, setReload] = useState(0);
    useEffect(() => {
        const fetchConversationList = async (callback) => {
            const getConversationResult = await common.getConversationList();
            callback(getConversationResult);
        }

        fetchConversationList((result) => {
            setConversations((prevArr) => [...prevArr, ...result]);
        });

        getSocket().on("reqMsg", (data) => { 
            /* 소켓에 메시지 들어오면 Side에 있는 Conversations 초기화하고 ReRender */
            setConversations([]); 
            setReload(()=>reload+1);
          }
        );

    }, [reload]);


    return (
        <div className="sideConversation" style={{position:"fixed", right:"0", width:"200px"}}>
            <h2>Message</h2>
            <div>
                {conversations.map((conversation, index) => {
                    /* conversation의 User1값이 null이면 User2가 상대방인 것임 */
                    const isMessageRead =
                        conversation.User1 === null
                            ? conversation.user1Read
                            : conversation.user2Read;
                    const friend =
                        conversation.User1 === null
                            ? conversation.User2
                            : conversation.User1;
                    return (
                        <Link to={`/message/${conversation.id}`}>
                            <div
                                className="messageInfo"
                                key={index}
                                
                            >
                                <div style={{
                                        backgroundImage: `url(${friend.image})`,
                                        backgroundSize: "40px 40px",
                                        backgroundRepeat: "no-repeat",
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        marginRight: "10px"
                                    }}
                                    alt="친구 프로필사진"
                                ></div>
                                <div>
                                    <h4
                                        style={{
                                            fontWeight: 700,
                                            marginBottom: "5px",
                                        }}
                                    >
                                        {friend.name}
                                    </h4>
                                    <p style={{ fontSize: "0.8em" }}>
                                        {conversation.lastChat}
                                    </p>
                                </div>
                                {/* 안 읽었으면 ReadNotification이 출력되게 ( 빨간색 원 ) */}
                                {isMessageRead || <div className="readNotification" 
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "red",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    right: "20px"
                                }} />}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Side;
