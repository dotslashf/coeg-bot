const { random } = require('../utility/helper');

module.exports = {
  name: 'bjirr',
  description: 'bjirr',
  execute(message, text) {
    const replies = ['yoi', 'vroohhh', 'coeg :V', 'awikwok', 'login'];
    const n = random(replies);

    message.reply(replies[n]);
  },
};
