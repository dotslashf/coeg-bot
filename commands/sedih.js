const { downloadImage, filterBlackWhite } = require('../util/helper');
const GeneratorVideo = require('../generator/GeneratorVideo');

module.exports = {
  name: 'sedih',
  description: 'tambah lagu sedih ke image',
  emoji: '😢',
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
      'sedih',
      './img-output/imgAudio.png'
    );
    await generatorImage.generateVideo(message);
  },
};
