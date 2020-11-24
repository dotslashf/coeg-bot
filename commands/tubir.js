const GeneratorTweet = require('../generator/GeneratorTweet');

const generatorTweet = new GeneratorTweet('tubir');

module.exports = {
  name: 'tubir',
  description: 'buat template tweet tubirfess',
  emoji: '👊',
  extraCommand: '[text untuk dimasukkan ke dalam template]',
  async execute(message, text) {
    const imagePath = await generatorTweet.generateTemplate(text);
    message.reply({ files: [imagePath] });
  },
};
