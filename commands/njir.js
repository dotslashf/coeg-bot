const { random } = require('../util/helper');

module.exports = {
  name: 'njir',
  description: 'njir',
  emoji: '🇳',
  execute(message, text) {
    const replies = [
      'gue sih owh aja',
      'buset bro',
      'hyung',
      'udah gila',
      'makin gila',
    ];
    const n = random(replies.length);

    message.reply(replies[n]);
  },
};
