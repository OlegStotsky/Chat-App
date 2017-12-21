const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'client', 'public');
const port = process.env.PORT || 3000;
app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', function(message) {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  })
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

server.listen(port, () => {
  console.log('listening on port', port);
});