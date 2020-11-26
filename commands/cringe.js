const fs = require('fs');
const baseFile = './img/cringe/';
const files = fs.readdirSync(baseFile);
const { random } = require('../util/helper');

module.exports = {
  name: 'cringe',
  description: 'buset lu cringe bangettt',
  emoji: '🥴',
  execute(message, text) {
    const n = random(files.length);
    const selectedImage = files[n];

    message.reply({ files: [baseFile + selectedImage] });
  },
};
