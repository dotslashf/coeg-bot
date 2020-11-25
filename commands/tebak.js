const GeneratorTebakKata = require('../generator/GeneratorTebakKata');
const Discord = require('discord.js');
const { saveScoreTebak, getScoreTebak } = require('../util/firebase');

const players = new Discord.Collection();
players.set('players', new Discord.Collection());

module.exports = {
  name: 'tebak',
  description: 'tebak-tebakan kata yuk',
  emoji: '🎮',
  extraCommand: 'new | char',
  async execute(message, text) {
    const player = players.get('players');
    const author = message.guild.member(message.author);
    const nickname = author.nickname ? author.nickname : author.user.username;

    // New game
    if (text == 'new' && !player.has(author.user.id)) {
      console.log('New game');
      const word = new GeneratorTebakKata();
      console.log(word.word);

      const embedNewGame = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata untuk: ${nickname}`)
        .setDescription(`🎲 Current score: ${word.score}`)
        .addField(
          'Tebak: ',
          `**${word.hiddenWord.join(' ').toUpperCase()}**`,
          false
        )
        .setColor('RANDOM');

      const msg = await message.channel.send(embedNewGame);
      player.set(author.user.id, { word: word, message: msg, wrongAnswer: [] });
    }

    // Answering without session
    else if (
      (text.split('').length > 1 || text.split('').length == 1) &&
      !player.has(author.user.id)
    ) {
      console.log('Answering without session');
      message.reply('Lu belum main anjir');
    }

    // Answering with 1 char
    else if (text.split('').length == 1) {
      console.log('Answering with 1 char');
      let char = text[0];
      let { word, message, wrongAnswer } = player.get(author.user.id);

      word.answer(char);

      const embedAnswer = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata untuk: ${nickname}`)
        .setDescription(`🎲 Current score: ${word.score}`)
        .addField(
          'Tebak: ',
          `**${word.hiddenWord.join(' ').toUpperCase()}**`,
          false
        )
        .setColor('RANDOM');

      // Success answering quiz
      if (word.word == word.hiddenWord.join('')) {
        embedAnswer
          .setDescription(`🎲 Score yang kamu dapatkan: \`${word.score}\``)
          .setTitle(`✨✨💎 Selamat ${nickname} 💎✨✨`);

        let scoreTotal = await getScoreTebak(message.guild.id, author.user.id);
        saveScoreTebak(
          message.guild.id,
          author.user.id,
          scoreTotal + word.score
        );

        player.delete(author.user.id);
      }
      // Wrong answer
      else if (!word.hiddenCharOnly.includes(char)) {
        wrongAnswer.push(char);
        embedAnswer.addField(
          `\nList salah:`,
          `**${wrongAnswer.join(', ').toUpperCase()}**`,
          false
        );
      }
      // Correct but still showing list answers
      else if (word.hiddenCharOnly.includes(char)) {
        embedAnswer.addField(
          `List salah:`,
          `**${wrongAnswer.join(', ').toUpperCase()}**`,
          false
        );
      }

      message.edit(embedAnswer);
    }

    // Answering with 1 word
    else if (text.split('').length > 1 && text != 'new') {
      console.log('Answering with 1 word');

      let { word, message, wrongAnswer } = player.get(author.user.id);
      const embedAnswer = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata untuk: ${nickname}`)
        .setDescription(`🎲 Current score: ${word.score}`)
        .setColor('RANDOM');

      if (word.answerWord(text)) {
        embedAnswer
          .setDescription(`🎲 Score yang kamu dapatkan: \`${word.score}\``)
          .addField(
            'Tebak: ',
            `**${word.hiddenWord.join(' ').toUpperCase()}**`,
            false
          )
          .setTitle(`✨✨💎 Selamat ${nickname} 💎✨✨`);

        let scoreTotal = await getScoreTebak(message.guild.id, author.user.id);
        saveScoreTebak(
          message.guild.id,
          author.user.id,
          scoreTotal + word.score
        );

        player.delete(author.user.id);
      } else {
        wrongAnswer.push(text);
        embedAnswer
          .addField(
            'Tebak: ',
            `**${word.hiddenWord.join(' ').toUpperCase()}**`,
            false
          )
          .addField(
            `\nList salah:`,
            `**${wrongAnswer.join(', ').toUpperCase()}**`,
            false
          );
      }

      message.edit(embedAnswer);
    }

    // New game / abandon previous game
    else if (text == 'new' && player.has(author.user.id)) {
      const word = new GeneratorTebakKata();
      message.reply('total score lu bakal dikurang 25 :V');

      let scoreTotal = await getScoreTebak(message.guild.id, author.user.id);
      saveScoreTebak(message.guild.id, author.user.id, scoreTotal - 25);

      console.log(word.word);

      const embedNewGame = new Discord.MessageEmbed()
        .setTitle(`🎮 Tebak kata untuk: ${nickname}`)
        .setDescription(`🎲 Current score: ${word.score}`)
        .addField(
          'Tebak: ',
          `**${word.hiddenWord.join(' ').toUpperCase()}**`,
          false
        )
        .setColor('RANDOM');

      const msg = await message.channel.send(embedNewGame);
      player.set(author.user.id, { word: word, message: msg, wrongAnswer: [] });
    }
  },
};
