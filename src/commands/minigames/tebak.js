const GeneratorTebakKata = require('../../generator/GeneratorTebakKata');
const Discord = require('discord.js');
const { saveScoreTebak, getScoreTebak } = require('../../util/firebase');

const players = new Discord.Collection();
players.set('players', new Discord.Collection());

module.exports = {
  name: 'tebak',
  description: 'tebak-tebakan kata yuk',
  emoji: '🎮',
  players,
  extraCommand: '[new / char tebakan / kata tebakan]',
  async execute(message, text) {
    const player = players.get('players');
    const author = message.guild.member(message.author);
    const nickname = author.nickname ? author.nickname : author.user.username;

    const uniqueId = `${message.guild.id}-${message.channel.id}-${message.author.id}`;

    if (text.match(/[^a-z]+/g)) {
      return message.reply('Hanya menerima huruf doang :V').then(msg => {
        msg.delete({ timeout: 3000 });
      });
    }

    // New game
    if (text == 'new' && !player.has(uniqueId)) {
      const word = new GeneratorTebakKata();

      const embedNewGame = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata | ${nickname}`)
        .setDescription(`🎲 ***Score: ${word.score}***`)
        .addField(
          'Tebak: ',
          `\`\`\`${word.hiddenWord.join(' ').toUpperCase()}\`\`\``,
          false
        )
        .setColor('RED');

      const msg = await message.channel.send(embedNewGame);
      player.set(uniqueId, { word, msg, wrongAnswer: [] });
    }

    // Answering without session
    else if (
      (text.split('').length > 1 || text.split('').length == 1) &&
      !player.has(uniqueId)
    ) {
      message.reply('Lu belum main coeg').then(msg => {
        msg.delete({ timeout: 3000 });
      });
    }
    // show embed quiz
    else if (text == 'show') {
      let { word, msg, wrongAnswer } = player.get(uniqueId);

      const embedAnswer = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata | ${nickname}`)
        .setDescription(`🎲 ***Score: ${word.score}***`)
        .addField(
          'Tebak: ',
          `\`\`\`${word.hiddenWord.join(' ').toUpperCase()}\`\`\``,
          false
        )
        .setColor('RED')
        .addField(
          `❌`,
          `\`\`\`${wrongAnswer.join(' ').toUpperCase()}\`\`\``,
          false
        );

      return msg.channel.send(embedAnswer);
    }
    // get clue
    else if (text == 'clue') {
      let { word, msg, wrongAnswer } = player.get(uniqueId);

      if (word.revealHiddenChar()) {
        word.minusScore(word.baseScoreModifier);
      } else {
        return msg.channel.send('Coeg 1 huruf masih minta clue').then(msg => {
          msg.delete({ timeout: 3000 });
        });
      }

      const embedAnswer = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata | ${nickname}`)
        .setDescription(`🎲 ***Score: ${word.score}***`)
        .addField(
          'Tebak: ',
          `\`\`\`${word.hiddenWord.join(' ').toUpperCase()}\`\`\``,
          false
        )
        .setColor('RED');

      const listSalah = wrongAnswer
        .map(a => {
          return `• ${a}`;
        })
        .join('\n')
        .toUpperCase();

      if (wrongAnswer.length > 0) {
        embedAnswer.addField(`❌`, `\`\`\`${listSalah}\`\`\``, false);
      }

      return msg.channel.send(embedAnswer);
    }

    // Answering with 1 char
    else if (text.split('').length == 1) {
      let char = text[0];
      let { word, msg, wrongAnswer } = player.get(uniqueId);

      if (wrongAnswer.includes(char)) {
        return msg.channel
          .send(`${char} sudah ada dalam list salah`)
          .then(msg => {
            msg.delete({ timeout: 3000 });
          });
      } else {
        word.answer(char);
      }

      const embedAnswer = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata | ${nickname}`)
        .setDescription(`🎲 ***Score: ${word.score}***`)
        .addField(
          'Tebak: ',
          `\`\`\`${word.hiddenWord.join(' ').toUpperCase()}\`\`\``,
          false
        )
        .setColor('RED');

      // Success answering 1 char
      if (word.isDone) {
        if (word.score > 0) {
          embedAnswer.setTitle(`✨ Selamat ${nickname}`);
          embedAnswer.setDescription(
            `🎲 ***Score yang didapatkan: ${word.score}***`
          );
          embedAnswer.setColor('GREEN');
        } else {
          wrongAnswer.push(char);
          embedAnswer.setDescription(
            `🎲 ***Kamu tidak mendapatkan score apa apa***\n\n\`Jawaban: ${word.word.toUpperCase()}\``
          );
        }

        let scoreTotal = await getScoreTebak(message.guild.id, author.user.id);
        saveScoreTebak(
          message.guild.id,
          author.user.id,
          nickname,
          scoreTotal + word.score
        );

        player.delete(uniqueId);
      }
      // Wrong answer
      else if (!word.hiddenCharOnly.includes(char)) {
        wrongAnswer.push(char);
      }

      const listSalah = wrongAnswer
        .map(a => {
          return `• ${a}`;
        })
        .join('\n')
        .toUpperCase();

      if (wrongAnswer.length > 0) {
        embedAnswer.addField(`❌`, `\`\`\`${listSalah}\`\`\``, false);
      }

      message.reply(embedAnswer);
    }

    // Answering with 1 word
    else if (text.split('').length > 1 && text != 'new') {
      let { word, msg, wrongAnswer } = player.get(uniqueId);

      const embedAnswer = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata | ${nickname}`)
        .setDescription(`🎲 ***Score: ${word.score}***`)
        .setColor('RED');

      if (wrongAnswer.includes(text)) {
        return msg.reply(`${text} sudah ada dalam list salah`).then(msg => {
          msg.delete({ timeout: 3000 });
        });
      } else {
        word.answerWord(text);
      }

      // Success answering 1 word
      if (word.isDone) {
        if (word.score > 0) {
          embedAnswer.setTitle(`✨ Selamat ${nickname}`);
          embedAnswer.setDescription(
            `🎲 ***Score yang didapatkan: ${word.score}***`
          );
          embedAnswer.setColor('GREEN');
        } else {
          embedAnswer.setDescription(
            `🎲 ***Kamu tidak mendapatkan score apa apa***\n\n\`Jawaban: ${word.word.toUpperCase()}\``
          );
        }

        embedAnswer.addField(
          'Tebak: ',
          `\`\`\`${word.hiddenWord.join(' ').toUpperCase()}\`\`\``,
          false
        );

        let scoreTotal = await getScoreTebak(message.guild.id, author.user.id);
        saveScoreTebak(
          message.guild.id,
          author.user.id,
          nickname,
          scoreTotal + word.score
        );

        player.delete(uniqueId);
      }
      // wrong answer 1 word
      else {
        embedAnswer
          .addField(
            'Tebak: ',
            `\`\`\`${word.hiddenWord.join(' ').toUpperCase()}\`\`\``,
            false
          )

          .setDescription(`🎲 ***Score: ${word.score}***`);

        wrongAnswer.push(text);
      }

      const listSalah = wrongAnswer
        .map(a => {
          return `• ${a}`;
        })
        .join('\n')
        .toUpperCase();

      if (wrongAnswer.length > 0) {
        embedAnswer.addField(`❌`, `\`\`\`${listSalah}\`\`\``, false);
      }

      msg.reply(embedAnswer);
    }

    // New game / abandon previous game
    else if (text == 'new' && player.has(uniqueId)) {
      const word = new GeneratorTebakKata();
      message.reply('Karena abandon game, scoremu bakal dikurang -10 :V');

      let scoreTotal = await getScoreTebak(message.guild.id, author.user.id);
      saveScoreTebak(
        message.guild.id,
        author.user.id,
        nickname,
        scoreTotal - 10
      );

      const embedNewGame = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata | ${nickname}`)
        .setDescription(`🎲 ***Score: ${word.score}***`)
        .addField(
          'Tebak: ',
          `\`\`\`${word.hiddenWord.join(' ').toUpperCase()}\`\`\``,
          false
        )
        .setColor('RED');

      const msg = await message.channel.send(embedNewGame);
      player.set(uniqueId, { word: word, msg: msg, wrongAnswer: [] });
    }
  },
};
