const Discord = require('discord.js');
const config = require('./config.js');
const fs = require('fs');
const { countCoeg, random } = require('./utility/helper');
const { saveDataCoeg, getDataCoeg } = require('./utility/firebase');

const client = new Discord.Client();
const cooldowns = new Discord.Collection();

client.commands = new Discord.Collection();
cooldowns.set('coeg', new Discord.Collection());

const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = config.PREFIX;

client.on('ready', () => {
  console.log(`471 is serving in mode: ${config.MODE}! 🚀`);
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
    const now = Date.now();
    const timestamps = cooldowns.get('coeg');
    const cooldownAmount = 5 * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `percuma lu spam, gak bakal ke itung coeg :V, tunggu ${timeLeft.toFixed(
            1
          )} baru ngomong coeg lagi dong.`
        );
      }
    } else {
      const emojiList = [
        '779254975561072650',
        '779255532136431636',
        '779279105358430258',
      ];
      const n = random(emojiList);

      message.react(emojiList[n]);
      const author = message.guild.member(message.author);

      var counter = null;

      try {
        counter = await getDataCoeg(author.user.id);
      } catch (error) {
        counter = 0;
      }
      const coegCountResult = countCoeg(message.content.split(' '));

      saveDataCoeg(author.user.id, author.nickname, counter + coegCountResult);
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
});

client.login(config.BOT_TOKEN[config.MODE]);
