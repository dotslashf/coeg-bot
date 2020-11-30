const { random } = require('../../util/helper');

module.exports = {
  name: 'buset',
  description: 'buset',
  emoji: '🅱️',
  execute(message, text) {
    const replies = ['lortt', '#anjayburik', 'njir', 'stress', 'cocote'];
    const n = random(replies.length);

    message.reply(replies[n]);
  },
};
