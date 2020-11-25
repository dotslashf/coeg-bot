const Discord = require('discord.js');
const got = require('got');
const config = require('../config');

module.exports = {
  name: 'meme',
  description: 'random meme dari berbagai macam subreddit',
  emoji: 'Ⓜ️',
  extraCommand: `[${config.LIST_SUBREDDIT.join(', ')}]`,
  execute(message, text) {
    const subreddit = text;

    if (!config.LIST_SUBREDDIT.includes(subreddit)) {
      message.reply('subreddit tidak terdaftar');
    }

    const embed = new Discord.MessageEmbed();
    // @ts-ignore
    got(`https://www.reddit.com/r/${subreddit}/random/.json`)
      .then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`);
        embed.setColor('RANDOM');
        embed.setImage(memeImage);
        embed.setFooter(
          `©️ r/${subreddit} | 👍 ${memeUpvotes} 💬 ${memeNumComments}`
        );
        message.channel.send(embed);
      })
      .catch(console.error);
  },
};
