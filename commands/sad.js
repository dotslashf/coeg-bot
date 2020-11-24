const { downloadImage } = require('../utility/helper');
const GeneratorVideo = require('../generator/GeneratorVideo');
const { filterBlackWhite } = require('../utility/helper');

module.exports = {
  name: 'sad',
  description: 'tambah lagu sad ke image',
  emoji: '😔',
  extraCommand: '[attachment atau link image]',
  async execute(message, text) {
    if (text === ' ' || text === '' || text == null) {
      return message.reply('coeg gambarnya mana :V').then(msg => {
        msg.delete({ timeout: 3000 });
      });
    }

    let url = null;

    message.attachments.size > 0
      ? message.attachments.map(attachment => {
          url = attachment.url;
        })
      : (url = text);

    await downloadImage(url, './img/imgAudio.png');
    filterBlackWhite('./img/imgAudio.png');

    const generatorImage = new GeneratorVideo(
      'sad',
      './img-output/imgAudio.png'
    );
    await generatorImage.generateVideo(message);
  },
};
