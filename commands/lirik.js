const { getSong } = require('genius-lyrics-api');
const config = require('../config');
const Discord = require('discord.js');
const request = require('request');

module.exports = {
  name: 'lirik',
  description: 'cari lirik lagu lewat genius',
  emoji: '🎤',
  extraCommand: '[Judul - Penyanyi]',
  execute(message, text) {
    if (text === ' ' || text === '' || text == null) {
      return message.reply('coeg judul lagu/penyanyinya mana :V').then(msg => {
        msg.delete({ timeout: 3000 });
      });
    }

    const title = text.split('-')[0];
    const artist = text.split('-')[1] ? text.split('-')[1] : '';

    const embed = new Discord.MessageEmbed();

    let options = {
      apiKey: config.GENIUS_TOKEN.ACCESS_TOKEN,
      title: title,
      artist: artist,
      optimizeQuery: true,
    };

    getSong(options).then(song => {
      let options = {
        method: 'GET',
        url: `https://api.genius.com/songs/${song.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.GENIUS_TOKEN.ACCESS_TOKEN}`,
        },
      };

      request(options, (error, response) => {
        const obj = JSON.parse(response.body);
        const title = obj.response.song.full_title;

        embed.setTitle(title);
        embed.setColor('YELLOW');
        embed.setURL(`${song.url}`);
        embed.setDescription(song.lyrics);
        embed.setThumbnail(song.albumArt);

        message.channel.send(embed);
      });
    });
  },
};
