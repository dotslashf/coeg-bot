const { downloadImage } = require('../utility/helper');
const GeneratorVideo = require('../generator/GeneratorVideo');

module.exports = {
  name: 'ketawa',
  description: 'ketawain aja tuh foto',
  async execute(message, text) {
    let url = null;

    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      });
    } else {
      url = text;
    }

    await downloadImage(url);
    const generatorImage = new GeneratorVideo('ketawa', './img/imgAudio.png');
    await generatorImage.generateVideo(message);
  },
};
