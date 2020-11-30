const GeneratorTweet = require('../../generator/GeneratorTweet');

const generatorTweet = new GeneratorTweet('fwb');

module.exports = {
  name: 'fwb',
  description: 'buat template tweet fwbase',
  emoji: '👩‍❤️‍💋‍👨',
  extraCommand: '[text untuk dimasukkan ke dalam template]',
  async execute(message, text) {
    if (text === ' ' || text === '' || text == null) {
      return message
        .reply('coeg text yang mau dimasukin ke template mana :V')
        .then(msg => {
          msg.delete({ timeout: 3000 });
        });
    }

    const imagePath = await generatorTweet.generateTemplate(text);
    message.reply({ files: [imagePath] });
  },
};
