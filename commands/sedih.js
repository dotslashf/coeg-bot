const { downloadImage, filterBlackWhite } = require('../utility/helper');
const GeneratorVideo = require('../generator/GeneratorVideo');

module.exports = {
  name: 'sedih',
  description: 'tambah lagu sedih ke image',
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
    filterBlackWhite('./img/imgAudio.png');

    const generatorImage = new GeneratorVideo(
      'sedih',
      './img-output/imgAudio.png'
    );
    await generatorImage.generateVideo(message);
  },
};
