import styles from "../../css/messanger.module.css";

function ChatRoom({messages, messageView}) {
  return (
    <div className={styles.chatRoom}>
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