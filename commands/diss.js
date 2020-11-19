const GeneratorTweet = require('../generator/GeneratorTweet');

const generatorTweet = new GeneratorTweet('diss');

module.exports = {
  name: 'diss',
  description: 'buat template tweet areajulid',
  async execute(message, text) {
    const imagePath = await generatorTweet.generateTemplate(text);
    message.reply({ files: [imagePath] });
  },
};
