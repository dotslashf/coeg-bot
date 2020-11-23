const GeneratorTweet = require('../generator/GeneratorTweet');

const generatorTweet = new GeneratorTweet('tubir');

module.exports = {
  name: 'tubir',
  description: 'buat template tweet tubirfess',
  emoji: '👊',
  async execute(message, text) {
    const imagePath = await generatorTweet.generateTemplate(text);
    message.reply({ files: [imagePath] });
  },
};
