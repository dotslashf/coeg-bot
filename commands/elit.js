const fs = require('fs');
const baseFile = './img/elit/';
const files = fs.readdirSync(baseFile);

module.exports = {
  name: 'elit',
  description: 'random elit meme',
  execute(message, text) {
    const n = Math.floor(Math.random() * files.length);
    const selectedImage = files[n];

    message.reply({ files: [baseFile + selectedImage] });
  },
};
