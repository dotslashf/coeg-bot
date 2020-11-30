const Discord = require('discord.js');

module.exports = {
  name: 'vote',
  description: 'bantu coeg-bot menjadi makin terkenal',
  execute(message, text) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Vote for Coeg-BOT')
      .setColor('GREEN')
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/ballot-box-with-ballot_1f5f3.png'
      )
      .setDescription(
        '__**top.gg**__\n[`COMING SOON`](https://discordbotlist.com/bots/coeg-bot "COMING SOON")\n----------------\n__**discordbotlist**__\n[`VOTE HERE`](https://discordbotlist.com/bots/coeg-bot "VOTE HERE")'
      )
      .addField('Reward', 'Entar deh masih dipikirin :V', false)
      .setFooter(
        `${new Date().toLocaleString()}`,
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/alarm-clock_23f0.png'
      );
    message.channel.send(embed);
  },
};
