const GeneratorTweet = require('../generator/GeneratorTweet');

const generatorTweet = new GeneratorTweet('fwb');

module.exports = {
  name: 'fwb',
  description: 'buat template tweet fwbase',
  emoji: '👩‍❤️‍💋‍👨',
  extraCommand: '[text untuk dimasukkan ke dalam template]',
  async execute(message, text) {
    const imagePath = await generatorTweet.generateTemplate(text);
    message.reply({ files: [imagePath] });
  },
};
