const Discord = require('discord.js');
const { capitalize } = require('../utility/helper');

module.exports = {
  name: 'tolong',
  description: 'nih command yang lu summon',
  emoji: 'ℹ️',
  execute(message, text) {
    const { commands } = message.client;
    const embed = new Discord.MessageEmbed();
    const author = message.guild.member(message.author);
    const nickname = author.nickname ? author.nickname : author.user.username;

    embed.setTitle(`Yahahay, ${nickname} minta tolong :V`);
    embed.setColor('RANDOM');
    embed.setDescription('Tolong command');
    commands.map(command => {
      embed.addField(
        `${command.emoji} ${capitalize(command.name)}`,
        command.description,
        false
      );
    });

    message.channel.send(embed);
  },
};
