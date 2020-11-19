module.exports = {
  name: 'hai',
  description: 'hai',
  execute(message, text) {
    const replies = [
      'yoi',
      'hai lort',
      'sok asik loe',
      'apasih',
      'owh',
      'hy',
      'hyung',
    ];
    const n = Math.floor(Math.random() * replies.length);

    message.reply(replies[n]);
  },
};
