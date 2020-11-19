const Discord = require('discord.js');
const config = require('./config.js');
const fs = require('fs');
const { countCoeg } = require('./utility/helper');
const { saveDataCoeg, getDataCoeg } = require('./utility/firebase');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = config.PREFIX;

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
  if (!client.commands.has(command)) return;

  const text = texts.slice(2).join(' ');

  try {
    client.commands.get(command).execute(message, text);
  } catch (error) {
    console.log(error);
    message.reply('error!');
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
