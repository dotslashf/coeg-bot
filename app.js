const Discord = require('discord.js');
const config = require('./config.json');
const Mock = require('./meme/mock');
const GeneratorMeme = require('./GenerateMeme');
const GeneratorVideo = require('./GenerateVideo');
const { downloadImage } = require('./utility/helper');

const client = new Discord.Client();
const generatorMeme = new GeneratorMeme();

const prefix = config.prefix;

client.on('ready', () => {
  console.log(`471 is serving! 🚀`);
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const texts = commandBody.split(' ');
  const command = texts[1].toLowerCase();

  if (!config.command_list.includes(command)) {
    console.log(`Command ${command} is not recognized!`);
    return;
  }

  console.log(`Executing command: ${command}`);

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

  if (command === 'diss') {
    const text = texts.slice(2).join(' ');
    const imagePath = await generatorMeme.generateMeme('diss', text);
    message.reply({ files: [imagePath] });
  }

  if (command === 'coeg') {
    const n = Math.floor(Math.random() * 3);
    const replies = ['bjirrr', 'lorttt', 'jahhh'];
    message.reply(replies[n]);
  }
  
    if (command === 'bjirr') {
    const n = Math.floor(Math.random() * 3);
    const replies = ['yoi, vroohhh', 'coeg :v'];
    message.reply(replies[n]);
  }

  if (command === 'buset') {
    const n = Math.floor(Math.random() * 3);
    const replies = ['lortt, #anjayburik', 'njir'];
    message.reply(replies[n]);
  }

  if (command === 'ketawa') {
    let url = null;

    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      });
    } else {
      url = texts[texts.length - 1];
    }

    await downloadImage(url);
    const generatorImage = new GeneratorVideo('ketawa', './img/imgAudio.png');
    generatorImage.generateVideo(message);
  }

  if (command === 'badut') {
    let url = null;

    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      });
    } else {
      url = texts[texts.length - 1];
    }

    await downloadImage(url);
    const generatorImage = new GeneratorVideo('badut', './img/imgAudio.png');
    generatorImage.generateVideo(message);
  }

  if (command === 'sedih') {
    let url = null;

    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      });
    } else {
      url = texts[texts.length - 1];
    }

    await downloadImage(url);
    const generatorImage = new GeneratorVideo('sedih', './img/imgAudio.png');
    generatorImage.generateVideo(message);
  }

  if (command === 'sad') {
    let url = null;

    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      });
    } else {
      url = texts[texts.length - 1];
    }

    await downloadImage(url);
    const generatorImage = new GeneratorVideo('sad', './img/imgAudio.png');
    generatorImage.generateVideo(message);
  }
});

client.login(config.BOT_TOKEN);