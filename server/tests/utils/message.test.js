const {generateMessage, generateLocationMessage} = require('../../utils/message.js');
const {expect} = require('chai');

describe('generate message', () => {
  it ('should generate the correct message object', () => {
     const from = 'someone';
     const text = 'some text';
     const message = generateMessage(from, text);
     expect(message.createdAt).to.be.a('number');
     expect(message).to.include({
       from,
       text
     });
  })
})

describe('generateLocationMessage', () => {
  it ('should generate the correct location message object', () => {
    const from = 'Admin';
    const lat = 12;
    const lng = 15;
    const url = `https://www.google.com/maps?q=${lat},${lng}`
    const locationMessage = generateLocationMessage(from, lat, lng);
    expect(locationMessage.createdAt).to.be.a('number');
    expect(locationMessage).to.include({
      url
    });
  });
});