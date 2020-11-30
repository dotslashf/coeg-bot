const Jimp = require('jimp');
const { sleep } = require('../util/helper');
const config = require('../../config');

class GeneratorRank {
  async generateRank(username, counter, rank) {
    let image = config.IMAGE_FILE.rank.original;
    let outputImage = config.IMAGE_FILE.rank.output;

    await Jimp.read(image)
      .then(async image => {
        await Jimp.loadFont('./src/font/Raleway-Medium.fnt').then(font => {
          image.print(
            font,
            0,
            185,
            {
              text: username,
              alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            },
            image.bitmap.width,
            image.bitmap.height
          );
          image.write(outputImage);
        });
      })
      .catch(err => {
        console.log('Generate rank step 1: ', err);
      });

    await sleep(100);
    // rank
    await Jimp.read(outputImage)
      .then(async image => {
        await Jimp.loadFont('./src/font/AvertaDemoPE-Regular.fnt').then(
          font => {
            image.print(
              font,
              295,
              353,
              {
                text: rank,
              },
              image.bitmap.width,
              image.bitmap.height
            );
            image.write(outputImage);
          }
        );
      })
      .catch(err => {
        console.log('Generate rank step 2: ', err);
      });

    await sleep(100);
    // count
    await Jimp.read(outputImage)
      .then(async image => {
        await Jimp.loadFont('./src/font/AvertaDemoPE-Regular.fnt').then(
          font => {
            image.print(
              font,
              245,
              303.5,
              {
                text: counter,
              },
              image.bitmap.width,
              image.bitmap.height
            );
            image.write(outputImage);
          }
        );
      })
      .catch(err => {
        console.log('Generate rank step 3: ', err);
      });

    await sleep(50);
    return outputImage;
  }

  async placeAvatar(templateRank, avatar) {
    const template = await Jimp.read(templateRank);
    const ava = await Jimp.read(avatar);

    template.composite(ava, 193, 50, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 1,
    });

    await template.writeAsync('./src/img-output/template-rank.png');
  }
}

module.exports = GeneratorRank;
