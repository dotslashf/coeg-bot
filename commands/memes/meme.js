const Discord = require('discord.js');
const got = require('got');
const config = require('../../config');
const { random } = require('../../util/helper');

module.exports = {
  name: 'meme',
  description: 'random meme dari berbagai macam subreddit',
  emoji: 'Ⓜ️',
  extraCommand: `[${config.LIST_SUBREDDIT.join(', ')}]`,
  execute(message, text) {
    let subreddit = text;

    if (subreddit == '') {
      const n = random(config.LIST_SUBREDDIT.length);
      subreddit = config.LIST_SUBREDDIT[n];
    }

    if (!config.LIST_SUBREDDIT.includes(subreddit)) {
      return message.reply('subreddit tidak terdaftar');
    }

    const embed = new Discord.MessageEmbed();
    // @ts-ignore
    const client = got.extend({
      prefixUrl: 'https://www.reddit.com/r',
      headers: {
        'User-Agent': 'Coeg-Bot',
      },
    });

    client
      .get(`${subreddit}/top/.json?sort=top&t=month&limit=100`)
      .then(response => {
        let content = JSON.parse(response.body);
        const n = random(content.data.children.length);
        let permalink = content.data.children[n].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content.data.children[n].data.url;
        let memeTitle = content.data.children[n].data.title;
        let memeUpvotes = content.data.children[n].data.ups;
        let memeNumComments = content.data.children[n].data.num_comments;
        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`);
        embed.setColor('ORANGE');
        embed.setImage(memeImage);
        embed.setFooter(
          `©️ r/${subreddit} | 👍 ${memeUpvotes} 💬 ${memeNumComments}`
        );
        message.channel.send(embed);
      })
      .catch(console.error);
  },
};
