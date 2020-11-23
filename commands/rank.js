const GeneratorRank = require('../generator/GeneratorRank');
const { getDataCoeg, rankCoeg } = require('../utility/firebase');
const { downloadImage, maskImage } = require('../utility/helper');

const generatorRank = new GeneratorRank();

module.exports = {
  name: 'rank',
  description: 'rank your coeg',
  async execute(message, text) {
    const author = message.guild.member(message.author);
    const sender_img = message.author.avatarURL({ format: 'png' });

    await downloadImage(sender_img, './img/avatar.png');
    await maskImage('./img/avatar.png');

    var coegCount = null;
    try {
      coegCount = await getDataCoeg(author.user.id);
    } catch (error) {
      coegCount = 0;
    }
    const rank = await rankCoeg(author.user.id);

    const nickname = author.nickname ? author.nickname : author.user.username;

    const imageRankPath = await generatorRank.generateRank(
      `${nickname}`,
      `${coegCount.toString()}`,
      `${rank.toString()}`
    );

    await generatorRank.placeAvatar(imageRankPath, './img-output/avatar.png');

    coegCount == 0
      ? message.reply('lu belum pernah ngomong coeg sama sekali :V')
      : message.reply({ files: [imageRankPath] });
  },
};
