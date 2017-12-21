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

socket.on('newLocationMessage', function({from, url, createdAt}) {
  const li = $('<li></li>');
  const a = $('<a target="_blank"></a>');
  li.text(`from: ${from} `);
  a.attr('href', url);
  a.text('My current location');
  li.append(a);
  $('#message-board').append(li); 
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  const messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  });
  messageTextbox.val('');
});

const sendLocation = $('#send-location');
sendLocation.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Your browser doesn\'t support geolocation');
  }
  sendLocation.attr('disabled', true);
  const defaultText = sendLocation.text();
  sendLocation.text('Fetching location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      from: 'User',
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    sendLocation.text(defaultText);
    sendLocation.attr('disabled', false);
  }, function() {
    alert('Unable to fetch location');
  });
});