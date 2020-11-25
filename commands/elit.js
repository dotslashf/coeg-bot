const fs = require('fs');
const baseFile = './img/elit/';
const files = fs.readdirSync(baseFile);
const { random } = require('../utility/helper');

module.exports = {
  name: 'elit',
  description: 'random elit meme',
  emoji: '😎',
  execute(message, text) {
    const n = random(files.length);
    const selectedImage = files[n];

    message.reply({ files: [baseFile + selectedImage] });
  },
};
