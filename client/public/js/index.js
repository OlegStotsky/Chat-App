const socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  const formattedTime = moment(data.createdAt).format('h:mm a');
  const messageTemplate = $('#message-template').html();
  const html = Mustache.render(messageTemplate, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  });
  $('#message-board').append(html);
});

socket.on('newLocationMessage', function({from, url, createdAt}) {
  const formattedTime = moment(createdAt).format('h:mm a');
  const locationMessageTemplate = $('#location-message-template').html();
  const html = Mustache.render(locationMessageTemplate, {
    from,
    url,
    createdAt: formattedTime
  });
  $('#message-board').append(html);
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