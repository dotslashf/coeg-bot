const { random } = require('../utility/helper');

module.exports = {
  name: 'coeg',
  description: 'coeg',
  emoji: '✌️',
  execute(message, text) {
    const replies = ['bjirrr', 'lorttt', 'jahhh', 'hadah', 'yoi bro'];
    const n = random(replies);

    message.reply(replies[n]);
  },
};
