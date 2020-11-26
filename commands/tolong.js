const Discord = require('discord.js');
const { capitalize } = require('../util/helper');

module.exports = {
  name: 'tolong',
  description: 'nih command yang lu summon',
  emoji: 'ℹ️',
  execute(message, text) {
    const { commands } = message.client;
    const embed = new Discord.MessageEmbed();

    embed.setTitle(`Command list untuk Coeg-BOT`);
    embed.setColor('RANDOM');
    embed.setDescription('Tolong command');
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
