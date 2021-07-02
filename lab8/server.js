const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { userJoin,  getCurrentUser,  userLeave,  getRoomUsers} = require('./model/users.js');
const { findRoom,setRoom, userLeaveRoom, checkMove} = require('./model/room.js');

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", socket => {

  socket.on("joinRoom", ({username}) => {

    const user = userJoin(socket.id, username);
    const room = setRoom(user);
    socket.join(room.name);
    socket.emit('message', "Welcome");

    socket.broadcast.to(room.name).emit('message', `${user.username} connect to game`);

    // Send users and room info
    io.to(room.name).emit('roomUsers', {
      room: room.name,
      user1: {name: (room.user1)?room.user1.username:"",symbol:'X'},
      user2: {name: (room.user2)?room.user2.username:"",symbol:'0'}
    });

    if(room.user1&&room.user2){
      io.to(room.name).emit('gameStart');
    }

  });


  socket.on("clickOnItem", (item) => {
    let res = checkMove(socket.id,item);
    if(res){
      // const room = findRoom(socket.id);
console.log(res);
      if(res.win){
        io.to(res.room.name).emit("updateStatus", res.win);
      } else{
        let symbol = (res.room.user1 && res.room.user1.id === socket.id)?'X':'0';
        io.to(res.room.name).emit("updateItem", {"item":item,"symbol":symbol});
      }

    }
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if(user){
      const room = userLeaveRoom(socket.id);
      io.to(room.name).emit('message', "User left the game");

      io.to(room.name).emit('roomUsers', {
        room: room.name,
        user1: {name: (room.user1)?room.user1.username:"",symbol:'X'},
        user2: {name: (room.user2)?room.user2.username:"",symbol:'0'}
      });
    }
  });
});

server.listen(3000, () => {
  console.log(`Server running on port 3000`);
})
