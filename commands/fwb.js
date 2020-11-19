const GeneratorMeme = require('../generator/GeneratorTweet');

const generatorMeme = new GeneratorMeme();

module.exports = {
  name: 'fwb',
  description: 'thanks fwbase',
  async execute(message, text) {
    const imagePath = await generatorMeme.generateMeme('fwb', text);
    message.reply({ files: [imagePath] });
  },
};
