const { random } = require('../utility/helper');

module.exports = {
  name: 'buset',
  description: 'buset',
  execute(message, text) {
    const replies = ['lortt', '#anjayburik', 'njir', 'stress', 'cocote'];
    const n = random(replies);

    message.reply(replies[n]);
  },
};
