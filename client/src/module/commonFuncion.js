import { useState, useReducer } from "react";
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

export async function getConversationDetail(selectedConversation) {
    try{
      const result = await axios.get(`/api/chat/message?conversation=${selectedConversation}`);  
      const messages = result.data;
      const partnerMessages = [];
      const myMessages = [];
      let partner;
      messages.map((message) => {
          partner =
              message.Receiver.id === null
                  ? message.Sender
                  : message.Receiver;
          if (partner.id === message.senderId) {
              partnerMessages.push(message.content);
          } else {
              myMessages.push(message.content);
          }
      });
      const partnerAndMyMessages = {
          partner: partner,
          chats: messages,
      };
      return partnerAndMyMessages;
    }catch(err){
      throw err;
    }
}
