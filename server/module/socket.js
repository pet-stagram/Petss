const http = require('http');
const { Server } = require('socket.io');
const service = require("../services/chatService");

let roomName;

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    },
    transports: ["websocket"]
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom",(data)=>{ 
      socket.join(data.roomName);
      roomName = data.roomName;
    });
/* nodemon으로 하면 서버가 재실행되어 roomName 값이 초기화됨 */
    socket.on("reqMsg", (messageInfo) => {
      io.sockets.in(roomName).emit("reqMsg", {comment: messageInfo.comment, conversation : messageInfo.conversation, sender: messageInfo.me});
      service.createMessages(messageInfo);
  })
  });
};

module.exports = socket;