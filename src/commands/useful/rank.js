const GeneratorRank = require('../../generator/GeneratorRank');
const {
  getDataCoeg,
  rankCoeg,
  rankScoreTebak,
} = require('../../util/firebase');
const {
  downloadImage,
  maskImage,
  getUserIdFromMention,
} = require('../../util/helper');
const Discord = require('discord.js');

const generatorRank = new GeneratorRank();

module.exports = {
  name: 'rank',
  description: 'rank your coeg',
  emoji: '#️⃣',
  async execute(message, text) {
    const args = text.split(' ');
    const command = args[0];
    let user = null;
    if (args.length > 1) {
      user = message.guild.member(getUserIdFromMention(args[1]));
    }

    const requestedUser = user ? user : message.guild.member(message.author);
    const avatarImg = user
      ? message.mentions.users.first().avatarURL({ format: 'png' })
      : message.author.avatarURL({ format: 'png' });
    const nickname = requestedUser.nickname
      ? requestedUser.nickname
      : requestedUser.user.username;

    // rank coeg
    if (command == 'coeg') {
      await downloadImage(avatarImg, './src/img/avatar.png');
      await maskImage('./src/img/avatar.png');

      var coegCount = null;
      try {
        coegCount = await getDataCoeg(message.guild.id, requestedUser.user.id);
      } catch (error) {
        coegCount = 0;
      }
      const rank = await rankCoeg(message.guild.id, requestedUser.user.id);

      const imageRankPath = await generatorRank.generateRank(
        `${nickname}`,
        `${coegCount.toString()}`,
        `${rank.toString()}`
      );

      await generatorRank.placeAvatar(
        imageRankPath,
        './src/img-output/avatar.png'
      );

      coegCount == 0
        ? message.channel.send(
            `<@${requestedUser.user.id}> belum pernah ngomong coeg sama sekali :V`
          )
        : message.channel.send({ files: [imageRankPath] });
    }

    // rank tebak
    else if (command == 'tebak') {
      const { pos, resultsSorted, score } = await rankScoreTebak(
        message.guild.id,
        requestedUser.user.id
      );

      const embed = new Discord.MessageEmbed()
        .setTitle(`🏅 Scoreboard tebak kata ${message.guild.name}`)
        .setColor('GREEN');
      user
        ? embed.setDescription(
            `✨ **${nickname} posisi ${pos} dengan score ${score}**`
          )
        : embed.setDescription(
            `✨ **kamu posisi ${pos} dengan score ${score}**`
          );

      if (pos == 0) {
        embed.setDescription(
          `❌ **${nickname} belum pernah bermain tebak kata**`
        );
      }

      const limit = resultsSorted.length > 3 ? 3 : resultsSorted.length;

      let listJuaraUmum = [];
      const medal = ['🥇', '🥈', '🥉'];
      for (let i = 0; i <= limit - 1; i++) {
        const element = resultsSorted[i];

        if (element) {
          const { _, value } = element;
          if (pos - 1 == i) {
            const str = `${medal[i]} | ${value.username} | ${value.score}`;
            let spaces = '';
            for (let i = 0; i < str.length; i++) {
              spaces += '=';
            }
            listJuaraUmum.push(`${str}\n${spaces}`);
          } else {
            listJuaraUmum.push(
              `${medal[i]} | ${value.username} | ${value.score}`
            );
          }
        }
      }

      embed.addField(
        'Top 3 Juara Umum: ',
        `\`\`\`asciidoc\n${listJuaraUmum.join('\n')}\`\`\``
      );

      message.channel.send(embed);
    }
  },
};
