const { Client } = require('discord.js');
const client = require('../index'); // requiring client from index.js
const { prefix } = require('../config.json'); // importing our prefix

/**
 * @param {Client}: bot
 * @param {String}: message
 */

// IMPORTANT: 'message' is deprecated, you may use 'messageCreate' for djs v13+
client.on('messageCreate', async(message) => {
    if(!message.content.startsWith(prefix) ||
        !message.guild ||
        message.author.bot
        ) return; // ignoring if messages dont start with prefix / executed in dms / executed by bots

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" "); // you may use `/ +/g` too in `split()`

    const cmd = client.commands.get(cmd.toLowerCase())
    if(!cmd) return message.reply(`No such command found with the name/alias: \`${cmd}\`.`);

    try {
        await cmd.run(client, message, args)
    } catch (error) {
        console.error(error);
        await message.reply(`Failed to execute command, please retry.`)
    }
})