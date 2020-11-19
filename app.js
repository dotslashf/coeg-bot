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

  if (command === 'cringe') {
    const n = Math.floor(Math.random() * 12);
    const imagePath = ['cringe1.png', 'cringe2.png', 'cringe3.png', 'cringe4.png', 'cringe5.png', 'cringe6.jpg', 'cringe7.jpg', 'cringe8.jpg', 'cringe9.jpg', 'cringe10.jpg', 'cringe11.jpg', 'cringe12.jpg'];
    message.reply({files: [imagePath[n]]});
  }

  if (command === 'elit') {
    const n = Math.floor(Math.random() * 10);
    const imagePath = ['elit1.jpg', 'elit2.jpg', 'elit3.jpg', 'elit4.jpg', 'elit5.jpg', 'elit6.jpg', 'elit7.jpg', 'elit8.jpg', 'elit9.jpg', 'elit10.jpg'];
    message.reply({files: [imagePath[n]]});
  }

  if (command === 'coeg') {
    const n = Math.floor(Math.random() * 5);
    const replies = ['bjirrr', 'lorttt', 'jahhh', 'hadah', 'yoi bro'];
    message.reply(replies[n]);
  }
  
    if (command === 'bjirr') {
    const n = Math.floor(Math.random() * 5);
    const replies = ['yoi', 'vroohhh', 'coeg :V', 'awikwok', 'login'];
    message.reply(replies[n]);
  }

  if (command === 'buset') {
    const n = Math.floor(Math.random() * 5);
    const replies = ['lortt', '#anjayburik', 'njir', 'stress', 'cocote'];
    message.reply(replies[n]);
  }

  if (command === 'njir') {
    const n = Math.floor(Math.random() * 5);
    const replies = ['gue sih owh aja', 'buset bro', 'hyung', 'udah gila', 'makin gila'];
    message.reply(replies[n]);
  }

  if (command === 'hai') {
    const n = Math.floor(Math.random() * 7);
    const replies = ['yoi', 'hai lort', 'sok asik loe', 'apasih', 'owh', 'hy', 'hyung'];
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