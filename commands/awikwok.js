const fs = require('fs');
const baseFile = './img/awikwok/';
const files = fs.readdirSync(baseFile);
const { random } = require('../util/helper');

module.exports = {
  name: 'awikwok',
  description: 'awikwok',
  emoji: '＼⍩⃝／',
  execute(message, text) {
    const n = random(files.length);
    const selectedImage = files[n];

    message.reply({ files: [baseFile + selectedImage] });
  },
};
