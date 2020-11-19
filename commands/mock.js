const Mock = require('../utility/mock');
const GeneratorMeme = require('../generator/GeneratorTweet');

const generatorMeme = new GeneratorMeme();

module.exports = {
  name: 'mock',
  description: 'Mock text and send mock template',
  async execute(message, text) {
    const mockText = new Mock(text);
    const imagePath = await generatorMeme.generateMeme(
      'mock',
      mockText.mockText()
    );
    message.reply({ files: [imagePath] });
  },
};
