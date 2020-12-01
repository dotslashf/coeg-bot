const { random } = require('../util/helper');

module.exports = {
  name: 'buset',
  description: 'buset',
  emoji: '🅱️',
  execute(message, text) {
    const replies = [
    'lortt',
    '#anjayburik',
    'njir',
    'stress',
    'cocote',
    'buset banget',
    'gue sih owh ajah',
    'parahh menn',
    'bjirrrr',
    'bisa aja coeg:V',
    'ngeriii',
    'xerammm',
    'ampun suhu',
    'edann',
    'sini kalo berani',
    'sinting ni orang',
    'bengek hyungg:v',
    'berak',
    'bodo amat',
    'widih si paling bener',
    'gak dulu :pray',
  ];
    const n = random(replies.length);

    message.reply(replies[n]);
  },
};
