var request = require('request');
const Discord = require('discord.js');

module.exports = {
  name: 'cariin',
  description: 'bantu cari kata dari kbbi',
  emoji: '🔍',
  extraCommand: '[kata yang mau dicari]',
  execute(message, text) {
    var options = {
      method: 'POST',
      url: 'https://kbbi-api.herokuapp.com/search',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kata: text }),
    };

    request(options, function (error, response) {
      if (error) {
        console.log(error);
        throw new Error(error);
      }

      if (response.statusCode == 404) {
        message.reply('kata yang lu cari gak ada di kbbi coeg :V').then(msg => {
          msg.delete({ timeout: 3000 });
        });
      } else {
        const definition = JSON.parse(response.body);
        const url = definition.message.pranala;
        definition.message.entri.map(d => {
          const embed = new Discord.MessageEmbed();
          embed.setTitle(`${d.nama} [${d.nomor ? d.nomor : 1}]`);
          embed.setURL(url);
          embed.setColor('RANDOM');
          d.makna.map(makna => {
            embed.addField(
              'Detail:',
              '```js' + '\n' + JSON.stringify(makna, null, 2) + '```',
              false
            );
          });
          message.channel.send(embed);
        });
      }
    });
  },
};
