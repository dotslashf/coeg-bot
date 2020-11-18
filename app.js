const Discord = require('discord.js');
const config = require('./config.json');
const Mock = require('./meme/mock');
const GeneratorMeme = require('./GenerateMeme');

const client = new Discord.Client();
const generatorMeme = new GeneratorMeme();

const prefix = ':V';

client.on('message', async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const texts = commandBody.split(' ');
  const command = texts[1].toLowerCase();

  if (command === 'mock') {
    const text = texts.slice(2).join(' ');

    const mockText = new Mock(text);
    const imagePath = await generatorMeme.generateMeme(
      'mocthistweet',
      mockText.mockText()
    );

    message.reply({ files: [imagePath] });
  }

  if (command === 'tubir') {
    const text = texts.slice(2).join(' ');

    const imagePath = await generatorMeme.generateMeme('tubirfess', text);

    message.reply({ files: [imagePath] });
  }

  if (command === 'fwb') {
    const text = texts.slice(2).join(' ');

    const imagePath = await generatorMeme.generateMeme('fwbase', text);

    message.reply({ files: [imagePath] });
  }

  if (command === 'coeg') {
    const n = Math.floor(Math.random() * 3);
    const replies = ['bjirrr', 'lorttt', 'jahhh'];
    message.reply(replies[n]);
  }
});

client.login(config.BOT_TOKEN);
