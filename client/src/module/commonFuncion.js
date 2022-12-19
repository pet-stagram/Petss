import axios from "axios";

export function reducer(state,action){
    switch (action.type){
        case "isChanged":
            return !state;
        default:
            return state;
    }
}

export async function getConversationList() {
    let conversations;
    try {
        const result = await axios.get("/api/chat/rooms");
        conversations = result.data;
        return conversations;
    } catch (err) {
        throw err;
    }
}

export function getChanged(bool){
    return !bool;
}

export async function getConversationDetail(selectedConversation,lastId) {

    try{
        const result = await axios.get(`/api/chat/message?conversation=${selectedConversation}&lastId=${lastId||0}`);  
      const messages = result.data.rows;
      let partner;
      messages.map((message) => {
          partner =
              message.Receiver.id === null
                  ? message.Sender
                  : message.Receiver;
      });
      const partnerAndMyMessages = {
          partner: partner,
          chats: messages,
          messageLength : result.data.count
      };
      
      return partnerAndMyMessages;
    }catch(err){
      throw err;
    }
}
