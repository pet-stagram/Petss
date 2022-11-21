import React from "react";
import "../../css/side.css";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-modal";
import Messanger from "../../messanger/Messanger";
import { Link } from "react-router-dom";
import * as common from "../../../module/commonFuncion";

const Side = () => {
    const FriendImg = styled.div`
        background-size: 40px 40px;
        background-repeat: no-repeat;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    `;
    const ReadNotification = styled.div`
        width: 10px;
        height: 10px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        right: 20px;
    `;

    const [conversations, setConversations] = useState([]);
    const [messageDto, setMessageDto] = useState({});
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const fetchConversationList = async (callback) => {
            const getConversationResult = await common.getConversationList();
            callback(getConversationResult);
        }

        fetchConversationList((result) => {
            setConversations((prevArr) => [...prevArr, ...result]);
        });
    }, []);

    

    return (
        <div className="side">
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
                                // onClick={() =>
                                //     fetchConversationDetail(conversation.id)
                                // }
                            >
                                <FriendImg
                                    style={{
                                        backgroundImage: `url(${friend.image})`,
                                    }}
                                    alt="친구 프로필사진"
                                ></FriendImg>
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
                                {isMessageRead || <ReadNotification />}
                            </div>
                        </Link>
                    );
                })}
                <button className="testBtn">Message</button>
            </div>
        </div>
    );
};

export default Side;
