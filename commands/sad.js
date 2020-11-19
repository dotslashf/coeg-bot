const { downloadImage } = require('../utility/helper');
const GeneratorVideo = require('../generator/GeneratorVideo');

module.exports = {
  name: 'sad',
  description: 'sad lebih sedih daripada sedih',
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
    const generatorImage = new GeneratorVideo('sad', './img/imgAudio.png');
    await generatorImage.generateVideo(message);
  },
};
