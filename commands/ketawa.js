const { downloadImage } = require('../utility/helper');
const GeneratorVideo = require('../generator/GeneratorVideo');

module.exports = {
  name: 'ketawa',
  description: 'tambah sound effect ketawa',
  async execute(message, text) {
    let url = null;

    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      });
    } else {
      url = text;
    }

    await downloadImage(url, './img/imgAudio.png');
    const generatorImage = new GeneratorVideo('ketawa', './img/imgAudio.png');
    await generatorImage.generateVideo(message);
  },
};
