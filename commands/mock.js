const Mock = require('../util/mock');
const GeneratorTweet = require('../generator/GeneratorTweet');

const generatorTweet = new GeneratorTweet('mock');

module.exports = {
  name: 'mock',
  description: 'buat template tweet mockthistweet',
  emoji: '🤔',
  extraCommand: '[text untuk dimasukkan ke dalam template]',
  async execute(message, text) {
    if (text === ' ' || text === '' || text == null) {
      return message
        .reply('coeg text yang mau dimasukin ke template mana :V')
        .then(msg => {
          msg.delete({ timeout: 3000 });
        });
    }

    const mockText = new Mock(text);
    const imagePath = await generatorTweet.generateTemplate(
      mockText.mockText()
    );
    message.reply({ files: [imagePath] });
  },
};
