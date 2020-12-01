const { random } = require('../util/helper');

module.exports = {
  name: 'hai',
  description: 'hai',
  emoji: '👋',
  execute(message, text) {
    const replies = [
      'yoi',
      'hai lort',
      'sok asik loe',
      'apasih',
      'owh',
      'hy',
      'hyung',
      'sok kenal',
      'bacot',
      'lu siapa?',
      '???',
      'siap ndan',
      'werr werr',
      'yahaha hayyukk',
      'annyeong:Vv',
      'yang bilang hai gausah ditemenin',
      'oit',
      'naon',
      'apa manggil manggil?',
      'dalem mas',
      'nopo bundsay',
      'nggih',

    ];
    const n = random(replies.length);

    message.reply(replies[n]);
  },
};
