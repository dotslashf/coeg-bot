const GeneratorRank = require('../generator/GeneratorRank');
const { getDataCoeg, rankCoeg } = require('../utility/firebase');

const generatorRank = new GeneratorRank();

module.exports = {
  name: 'rank',
  description: 'rank your coeg',
  async execute(message, text) {
    const sender_id = message.author.id;
    const sender_img = message.author.avatarURL({ format: 'png' });
    console.log(sender_img);
    const coegCount = await getDataCoeg(sender_id);
    const rank = await rankCoeg(sender_id);

    const imageRankPath = await generatorRank.generateRank(
      `@${message.author.username}`,
      `${coegCount.toString()}`,
      `${rank.toString()}`
    );
    message.reply({ files: [imageRankPath] });
  },
};
