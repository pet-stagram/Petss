import { io } from 'socket.io-client';

const socket = io('http://localhost:5100');

export const getSocket = () => {
  return socket;
}


export const joinChat= (room) => {
  socket.emit("joinRoom", {roomName: room});
}

export const receiveMessage = () => {
  let chatComment;
                                                               
  socket.on("reqMsg", (data) => {return data});
}

export const sendSocketMessage = (content) => {
  socket.emit("reqMsg",{comment: content.value});
}