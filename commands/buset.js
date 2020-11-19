module.exports = {
  name: 'buset',
  description: 'buset',
  execute(message, text) {
    const replies = ['lortt', '#anjayburik', 'njir', 'stress', 'cocote'];
    const n = Math.floor(Math.random() * replies.length);

    message.reply(replies[n]);
  },
};
