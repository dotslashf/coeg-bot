module.exports = {
  name: 'njir',
  description: 'njir',
  execute(message, text) {
    const replies = [
      'gue sih owh aja',
      'buset bro',
      'hyung',
      'udah gila',
      'makin gila',
    ];
    const n = Math.floor(Math.random() * replies.length);

    message.reply(replies[n]);
  },
};
