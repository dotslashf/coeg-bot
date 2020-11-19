const GeneratorMeme = require('../generator/GeneratorTweet');

const generatorMeme = new GeneratorMeme();

module.exports = {
  name: 'tubir',
  description: 'tubirin aja udah',
  async execute(message, text) {
    const imagePath = await generatorMeme.generateMeme('tubir', text);
    message.reply({ files: [imagePath] });
  },
};
