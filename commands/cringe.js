const fs = require('fs');
const baseFile = './img/cringe/';
const files = fs.readdirSync(baseFile);

module.exports = {
  name: 'cringe',
  description: 'buset lu cringe bangettt',
  execute(message, text) {
    const n = Math.floor(Math.random() * files.length);
    const selectedImage = files[n];

    message.reply({ files: [baseFile + selectedImage] });
  },
};
