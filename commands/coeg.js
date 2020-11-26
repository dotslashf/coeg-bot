const { random } = require('../util/helper');

module.exports = {
  name: 'coeg',
  description: 'coeg',
  emoji: '✌️',
  execute(message, text) {
    const replies = ['bjirrr', 'lorttt', 'jahhh', 'hadah', 'yoi bro'];
    const n = random(replies.length);

    message.reply(replies[n]);
  },
};
