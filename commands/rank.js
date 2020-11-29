const GeneratorRank = require('../generator/GeneratorRank');
const { getDataCoeg, rankCoeg, rankScoreTebak } = require('../util/firebase');
const { downloadImage, maskImage } = require('../util/helper');
const Discord = require('discord.js');

const generatorRank = new GeneratorRank();

module.exports = {
  name: 'rank',
  description: 'rank your coeg',
  emoji: '#️⃣',
  async execute(message, text) {
    const author = message.guild.member(message.author);
    const sender_img = message.author.avatarURL({ format: 'png' });

    // rank coeg
    if (text == 'coeg') {
      await downloadImage(sender_img, './img/avatar.png');
      await maskImage('./img/avatar.png');

      var coegCount = null;
      try {
        coegCount = await getDataCoeg(message.guild.id, author.user.id);
      } catch (error) {
        coegCount = 0;
      }
      const rank = await rankCoeg(message.guild.id, author.user.id);

      const nickname = author.nickname ? author.nickname : author.user.username;

      const imageRankPath = await generatorRank.generateRank(
        `${nickname}`,
        `${coegCount.toString()}`,
        `${rank.toString()}`
      );

      await generatorRank.placeAvatar(imageRankPath, './img-output/avatar.png');

      coegCount == 0
        ? message.reply('lu belum pernah ngomong coeg sama sekali :V')
        : message.reply({ files: [imageRankPath] });
    }

    // rank tebak
    else if (text == 'tebak') {
      const { pos, resultsSorted, score } = await rankScoreTebak(
        message.guild.id,
        author.user.id
      );

      const embed = new Discord.MessageEmbed()
        .setTitle(`🎬 SCOREBOARD TEBAK KATA ${message.guild.name} 🎬`)
        .setColor('GREEN')
        .setDescription(`✨ **Kamu posisi ${pos} dengan score ${score}** ✨`);

      const limit = resultsSorted.length > 5 ? 5 : resultsSorted.length;

      let listJuaraUmum = [];
      for (let i = 0; i <= limit - 1; i++) {
        const element = resultsSorted[i];

        if (element) {
          const { _, value } = element;
          if (pos - 1 == i) {
            const str = `${i + 1} | ${value.username} | ${value.score}`;
            let spaces = '';
            for (let i = 0; i < str.length; i++) {
              spaces += '=';
            }
            listJuaraUmum.push(`${str}\n${spaces}`);
          } else {
            listJuaraUmum.push(`${i + 1} | ${value.username} | ${value.score}`);
          }
        }
      }

      embed.addField(
        'Top 5 Juara Umum: ',
        `\`\`\`asciidoc\n${listJuaraUmum.join('\n')}\`\`\``
      );

      message.channel.send(embed);
    }
  },
};
