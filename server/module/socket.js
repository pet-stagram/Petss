const http = require('http');
const { Server } = require('socket.io');

let roomName;

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    let instanceId = socket.id;
  
    socket.on('joinRoom',(data)=>{
      console.log(data);
      socket.join(data.roomName);
      roomName = data.roomName;
    })

    socket.on('reqMsg', function (data) {
      console.log(data);
      io.sockets.in(roomName).emit('reqMsg', {comment: instanceId + " : " + data.comment+'\n'});
  })
  });
};

module.exports = socket;