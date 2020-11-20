const { random } = require('../utility/helper');

module.exports = {
  name: 'hai',
  description: 'hai',
  execute(message, text) {
    const replies = [
      'yoi',
      'hai lort',
      'sok asik loe',
      'apasih',
      'owh',
      'hy',
      'hyung',
    ];
    const n = random(replies);

    message.reply(replies[n]);
  },
};
