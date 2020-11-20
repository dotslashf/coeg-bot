const { downloadImage } = require('../utility/helper');
const GeneratorVideo = require('../generator/GeneratorVideo');
const { filterBlackWhite } = require('../utility/helper');

module.exports = {
  name: 'sad',
  description: 'tambah lagu sad ke image',
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
      'sad',
      './img-output/imgAudio.png'
    );
    await generatorImage.generateVideo(message);
  },
};
