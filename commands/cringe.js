const fs = require('fs');
const baseFile = './img/cringe/';
const files = fs.readdirSync(baseFile);
const { random } = require('../utility/helper');

module.exports = {
  name: 'cringe',
  description: 'buset lu cringe bangettt',
  execute(message, text) {
    const n = random(files);
    const selectedImage = files[n];

    message.reply({ files: [baseFile + selectedImage] });
  },
};
