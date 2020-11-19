module.exports = {
  name: 'coeg',
  description: 'coeg',
  execute(message, text) {
    const replies = ['bjirrr', 'lorttt', 'jahhh', 'hadah', 'yoi bro'];
    const n = Math.floor(Math.random() * replies.length);

    message.reply(replies[n]);
  },
};
