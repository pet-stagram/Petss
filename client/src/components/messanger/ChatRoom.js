
function ChatRoom({messages, messageView}) {
  return (
    <div className="chatRoom" style={{ margin: "90px 0 70px 0", zIndex:"-1" ,position:"static"}} >
                {messages.chats.map((chat, index) => {
                    if (chat.senderId === messages.partner.id) {
                        return (
                            <div
                                className="chatWrap"
                                style={{ width: "100%", display: "block" }}
                                key={index}
                            >
                                <span
                                    style={{
                                        backgroundColor: "white",
                                        border: "1px solid #eee",
                                        padding: "12px 15px",
                                        margin: "12px 20px",
                                        borderRadius: "20px",
                                    }}
                                >
                                    {chat.content}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                className="chatWrap"
                                style={{
                                    width: "100%",
                                    display: "inline-block",
                                }}
                            >
                                <span
                                    style={{
                                        backgroundColor: "#ccc",
                                        border: "1px solid #eee",
                                        padding: "12px 15px",
                                        margin: "12px 20px",
                                        float: "right",
                                        borderRadius: "20px",
                                    }}
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
                                className="chatWrap"
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                                key={index}
                            >
                                <span
                                    style={{
                                        backgroundColor: "#ccc",
                                        border: "1px solid #eee",
                                        padding: "12px 15px",
                                        margin: "12px 20px",
                                        borderRadius: "20px",
                                    }}
                                >
                                    {message.comment}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                className="chatWrap"
                                style={{ width: "100%", display: "flex" }}
                            >
                                <span
                                    style={{
                                        backgroundColor: "white",
                                        border: "1px solid #eee",
                                        padding: "12px 15px",
                                        margin: "12px 20px",
                                        borderRadius: "20px",
                                    }}
                                >
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