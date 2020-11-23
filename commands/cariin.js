var request = require('request');

module.exports = {
  name: 'cariin',
  description: 'bantu cari kata dari kbbi',
  emoji: '🔍',
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
        message.reply('coeg lu nulis kata yang bener dong :V');
      } else {
        const definition = JSON.parse(response.body);
        definition.message.entri.map(d => {
          const reply = JSON.stringify(
            {
              nama: d.nama,
              makna: d.makna[0],
              kata_dasar: d.kata_dasar,
            },
            null,
            2
          );
          message.reply('```json\n' + reply + '\n```');
        });
      }
    });
  },
};
