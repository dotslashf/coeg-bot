const GeneratorMeme = require('../generator/GeneratorTweet');

const generatorMeme = new GeneratorMeme();

module.exports = {
  name: 'diss',
  description: 'julidin orang aje lu',
  async execute(message, text) {
    const imagePath = await generatorMeme.generateMeme('diss', text);
    message.reply({ files: [imagePath] });
  },
};
