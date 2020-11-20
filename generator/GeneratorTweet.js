const Jimp = require('jimp');
const { sleep } = require('../utility/helper');
const config = require('../config.js');

class GeneratorTweet {
  constructor(type) {
    this.originalImage = config.IMAGE_FILE[type].original;
    this.outputImage = config.IMAGE_FILE[type].output;
  }
  async generateTemplate(caption) {
    await Jimp.read(this.originalImage)
      .then(async image => {
        await Jimp.loadFont('./font/segoeui.fnt').then(font => {
          // 65, 140
          image.print(
            font,
            65,
            140,
            {
              text: caption,
              alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
            },
            image.bitmap.width - 65,
            image.bitmap.height
          );
          image.write(this.outputImage);
        });
      })
      .catch(err => {
        console.log('Generate meme: ' + err);
      });
    await sleep(50);
    return this.outputImage;
  }
}

module.exports = GeneratorTweet;
