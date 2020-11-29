const GeneratorTebakKata = require('../generator/GeneratorTebakKata');
const Discord = require('discord.js');
const { saveScoreTebak, getScoreTebak } = require('../util/firebase');

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

    // New game
    if (text == 'new' && !player.has(uniqueId)) {
      console.log('New game');
      const word = new GeneratorTebakKata();
      console.log(word.word);

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
      console.log('Answering without session');
      message.reply('Lu belum main anjir').then(msg => {
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

    // Answering with 1 char
    else if (text.split('').length == 1) {
      console.log('Answering with 1 char');
      let char = text[0];
      let { word, msg, wrongAnswer } = player.get(uniqueId);

      if (wrongAnswer.includes(char)) {
        return msg.reply(`${char} sudah ada dalam list salah`).then(msg => {
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

      embedAnswer.addField(`❌`, `\`\`\`${listSalah}\`\`\``, false);

      message.reply(embedAnswer);
    }

    // Answering with 1 word
    else if (text.split('').length > 1 && text != 'new') {
      console.log('Answering with 1 word');

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

      embedAnswer.addField(`❌`, `\`\`\`${listSalah}\`\`\``, false);

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

      console.log(word.word);

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
