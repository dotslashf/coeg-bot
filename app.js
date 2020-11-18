const Discord = require('discord.js');
const config = require('./config.json');
const Mock = require('./meme/mock');
const GeneratorMeme = require('./GenerateMeme');
const GeneratorVideo = require('./GenerateVideo');
const { downloadImage, countCoeg } = require('./utility/helper');
const {
  fire,
  saveDataCoeg,
  getDataCoeg,
  rankCoeg,
} = require('./utility/firebase');

const client = new Discord.Client();
const generatorMeme = new GeneratorMeme();
const db = fire.database();

const prefix = config.prefix;

client.on('ready', () => {
  console.log(`471 is serving! 🚀`);
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const texts = commandBody.split(' ');
  if (texts.length <= 1) return;

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
    await generatorImage.generateVideo(message);
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
    await generatorImage.generateVideo(message);
  }

  if (command === 'rank') {
    const sender_id = message.author.id;
    const coegCount = await getDataCoeg(sender_id);
    const coegTotal = await rankCoeg();
    let results = [];
    Promise.all(
      Object.keys(coegTotal).map(key => {
        results.push({ key: key, value: coegTotal[key].counter });
      })
    );
    let resultsSorted = results.sort((a, b) => {
      return b.value - a.value;
    });
    var pos = resultsSorted
      .map(x => {
        return x.key;
      })
      .indexOf(sender_id);

    message.reply(`Coegmu udah sebanyak ${coegCount} dan Rankmu ${pos + 1}`);
  }
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) return;

  if (message.content.includes('coeg') || message.content.includes('Coeg')) {
    const sender_id = message.author.id;
    const username = message.author.username;

    const counter = await getDataCoeg(sender_id);
    const coegCountResult = countCoeg(message.content.split(' '));

    saveDataCoeg(sender_id, username, counter + coegCountResult);
  }
});

client.login(config.BOT_TOKEN.dev);
