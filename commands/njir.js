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
      'stress ni orang',
      'haha normies',
      'wadohh parah nih',
      'awikwok banget kata gua teh',
      'gak nyangka sich',
      'hadah hadah',
      'sok kaget loe',
      'ckckck',
      'akwoakwokaoaka',
      'ba dum tss',
      'pret',
      'yoi',
      'vroohhh',
      'coeg :V',
      'awikwok',
      'login',
    ];
    const n = random(replies.length);

    message.reply(replies[n]);
  },
};
