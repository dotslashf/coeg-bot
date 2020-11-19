module.exports = {
  name: 'bjirr',
  description: 'bjirr',
  execute(message, text) {
    const replies = ['yoi', 'vroohhh', 'coeg :V', 'awikwok', 'login'];
    const n = Math.floor(Math.random() * replies.length);

    message.reply(replies[n]);
  },
};
