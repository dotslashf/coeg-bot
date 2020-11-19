const Jimp = require('jimp');
const { sleep } = require('../utility/helper');
const config = require('../config.js');

class GeneratorMeme {
  async generateMeme(type, caption) {
    let image,
      outputImage = null;

    if (type === 'mock') {
      image = config.IMAGE_FILE.mockthistweet.original;
      outputImage = config.IMAGE_FILE.mockthistweet.output;
    } else if (type === 'tubir') {
      image = config.IMAGE_FILE.tubirfess.original;
      outputImage = config.IMAGE_FILE.tubirfess.output;
    } else if (type === 'fwb') {
      image = config.IMAGE_FILE.fwbase.original;
      outputImage = config.IMAGE_FILE.fwbase.output;
    } else if (type === 'diss') {
      image = config.IMAGE_FILE.areajulid.original;
      outputImage = config.IMAGE_FILE.areajulid.output;
    }
    await Jimp.read(image)
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
          image.write(outputImage);
        });
      })
      .catch(err => {
        console.log('Generate meme: ' + err);
      });
    await sleep(50);
    return outputImage;
  }
}

module.exports = GeneratorMeme;
