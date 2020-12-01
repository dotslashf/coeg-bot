const { random } = require('../util/helper');

module.exports = {
  name: 'coeg',
  description: 'coeg',
  emoji: '✌️',
  execute(message, text) {
    const replies = [
    'bjirrr',
    'lorttt',
    'jahhh',
    'hadah', 
    'yoi bro',
    'waduhhh',
    'vrohh:V',
    'mantab den',
    'Awikwok',
    'ashiyapppp:V',
    'adu coeg:Vv',
    'hayyukkkk',
    'duarrrr',
    'yomann',
    'taraktak dung',
    'jyahhh',
  ];
    const n = random(replies.length);

    message.reply(replies[n]);
  },
};
