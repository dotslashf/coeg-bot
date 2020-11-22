const GeneratorRank = require('../generator/GeneratorRank');
const { getDataCoeg, rankCoeg } = require('../utility/firebase');
const { downloadImage, maskImage } = require('../utility/helper');

const generatorRank = new GeneratorRank();

module.exports = {
  name: 'rank',
  description: 'rank your coeg',
  async execute(message, text) {
    const sender_id = message.author.id;
    const sender_img = message.author.avatarURL({ format: 'png' });

    await downloadImage(sender_img, './img/avatar.png');
    await maskImage('./img/avatar.png');

    var coegCount = null;
    try {
      coegCount = await getDataCoeg(sender_id);
    } catch (error) {
      coegCount = 0;
    }
    const rank = await rankCoeg(sender_id);

    const imageRankPath = await generatorRank.generateRank(
      `@${message.author.username}`,
      `${coegCount.toString()}`,
      `${rank.toString()}`
    );

    await generatorRank.placeAvatar(imageRankPath, './img-output/avatar.png');

    coegCount == 0
      ? message.reply('lu belum pernah ngomong coeg sama sekali :V')
      : message.reply({ files: [imageRankPath] });
  },
};
