const Mock = require('../utility/mock');
const GeneratorTweet = require('../generator/GeneratorTweet');

const generatorTweet = new GeneratorTweet('mock');

module.exports = {
  name: 'mock',
  description: 'buat template tweet mockthistweet',
  emoji: '🤔',
  extraCommand: '[text untuk dimasukkan ke dalam template]',
  async execute(message, text) {
    const mockText = new Mock(text);
    const imagePath = await generatorTweet.generateTemplate(
      mockText.mockText()
    );
    message.reply({ files: [imagePath] });
  },
};
