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

    embed.setTitle(`Command list untuk Coeg-BOT`);
    embed.setColor('RANDOM');
    embed.setDescription('Tolong command');
    embed.setAuthor(nickname, message.author.avatarURL({ format: 'png' }));
    embed.setTimestamp(Date.now());
    commands.map(command => {
      embed.addField(
        `${command.emoji} ${capitalize(command.name)}`,
        `\n\`:V ${command.name} ${
          command.extraCommand ? command.extraCommand : ''
        }\` \n\n **${command.description}**`,
        true
      );
    });

    message.channel.send(embed);
  },
};
