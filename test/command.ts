const client = require('path to index file');

module.exports = {
    name: 'test',
    aliases: 'test',
    hidden: true,
    description: 'test command',
    usage: '<test> [test]',

    run: async(msg) => {
        msg.reply('test')
    }
}