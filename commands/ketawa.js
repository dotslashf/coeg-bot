const { downloadImage } = require('../util/helper');
const GeneratorVideo = require('../generator/GeneratorVideo');

module.exports = {
  name: 'ketawa',
  description: 'tambah sound effect ketawa',
  emoji: '😂',
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
    const generatorImage = new GeneratorVideo('ketawa', './img/imgAudio.png');
    await generatorImage.generateVideo(message);
  },
};
