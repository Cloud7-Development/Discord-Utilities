import { Client, Message } from "discord.js";

module.exports = {
    name: 'test',
    aliases: 'test',
    hidden: true,
    description: 'test command',
    usage: '<test> [test]',
    botPerms: ["ADMINISTRATOR"],
    userPerms: ["ADMINISTRATOR"],
    
    /**
     * @param {Client} bot
     * @param {Message} msg
     */

    run: async(msg) => {
        msg.reply('Hi! :) this is a test!')
    }
}
