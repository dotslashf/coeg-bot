const { random } = require('../utility/helper');

module.exports = {
  name: 'njir',
  description: 'njir',
  execute(message, text) {
    const replies = [
      'gue sih owh aja',
      'buset bro',
      'hyung',
      'udah gila',
      'makin gila',
    ];
    const n = random(replies);

    message.reply(replies[n]);
  },
};
