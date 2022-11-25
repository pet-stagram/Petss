import { io } from 'socket.io-client';

export const socket = io('http://localhost:5100' ,{credentials: true,transports: ['websocket']});

export const getSocket = () => {
  return socket;
}

export const joinChat= (room) => {
  socket.emit("joinRoom", {roomName: room});
}

export const receiveMessage = () => {  
  socket.on("reqMsg", (data) => {
    return data;
  }
  );
}

export const sendSocketMessage = (messageInfo) => {
  const {conversation, content, sender, me, partner} = messageInfo;
  socket.emit("reqMsg",{comment: content.value, conversation, sender, me, partner});
}