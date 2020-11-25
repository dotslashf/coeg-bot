const { random } = require('../util/helper');

module.exports = {
  name: 'bjirr',
  description: 'bjirr',
  emoji: '🅱️',
  execute(message, text) {
    const replies = ['yoi', 'vroohhh', 'coeg :V', 'awikwok', 'login'];
    const n = random(replies.length);

    message.reply(replies[n]);
  },
};
