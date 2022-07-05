const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const messages = [];
const users = [];

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

// Websocket - serwer listener
io.on('connection', (socket) => {
  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);  // broadcast to all sockets, except one we send it from
  });
  
  socket.on('join', (login) => {
    users.push({ name: login, id: socket.id });
    socket.broadcast.emit('message', { author: 'Chat Bot', content: '<i>' + login + ' has joined the conversation!</i>'});  
    // console.log(users);
  });

  socket.on('disconnect', () => {
    // const userIndex = users.findIndex(user => { return user.id === socket.id });
    // const userIndex = users.findIndex(user => user.id === socket.id);
    const userIndex = users.findIndex(obj => obj.id == socket.id)
    if (userIndex >= 0) {
      socket.broadcast.emit('message', { author: 'Chat Bot', content: '<i>' + users[userIndex].name + ' has left the conversation... :(</i>' });  
      users.splice(userIndex, 1);
    }
    // console.log(users);
  });
});

app.use(express.static(path.join(__dirname, '/client/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});