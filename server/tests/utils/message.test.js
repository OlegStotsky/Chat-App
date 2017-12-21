const {generateMessage} = require('../../utils/message.js');
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