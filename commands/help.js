module.exports = {
  name: 'tolong',
  description: 'nih command yang lu summon',
  execute(message, text) {
    const { commands } = message.client;
    let data = [];

    data.push('Yahahay coeg minta tolong :V\n');
    data.push(
      commands
        .map(command => `${command.name}: ${command.description} `)
        .join('\n')
    );

    message.reply(data);
  },
};
