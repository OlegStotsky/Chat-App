const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'client', 'public');
const port = process.env.PORT || 3000;
app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the channel'));
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the channel'));

  socket.on('createMessage', function(message) {
    io.emit('newMessage', generateMessage(message.from, message.text));
  });
  socket.on('createLocationMessage', function(message) {
    io.emit('newLocationMessage', generateLocationMessage(message.from, message.lat, message.lng));
  })
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

server.listen(port, () => {
  console.log('listening on port', port);
});