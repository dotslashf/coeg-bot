const Jimp = require('jimp');
const { sleep } = require('./utility/helper');
const config = require('./config.json');

class GeneratorMeme {
  async generateMeme(type, caption) {
    let image,
      outputImage = null;

    if (type === 'mocthistweet') {
      image = config.image_file.mockthistweet.original;
      outputImage = config.image_file.mockthistweet.output;
    } else if (type === 'tubirfess') {
      image = config.image_file.tubirfess.original;
      outputImage = config.image_file.tubirfess.output;
    } else if (type === 'fwbase') {
      image = config.image_file.fwbase.original;
      outputImage = config.image_file.fwbase.output;
    } else if (type === 'diss') {
      image = config.image_file.areajulid.original;
      outputImage = config.image_file.areajulid.output;
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
    await sleep(100);
    return outputImage;
  }
}

module.exports = GeneratorMeme;
