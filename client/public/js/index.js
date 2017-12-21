const socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
socket.on('newMessage', function(data) {
  const li = $('<li></li>');
  li.text(`from: ${data.from} message: ${data.text}`);
  $('#message-board').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: e.target.message.value
  });
})