import { Client } from "discord.js";

module.exports = {
    name: 'test',
    aliases: 'test',
    hidden: true,
    description: 'test command',
    usage: '<test> [test]',
    
    /**
     * @param {Client} bot
     * @param {String} msg
     * @param msg message
     */

    run: async(msg) => {
        msg.reply('Hi! :) this is a test!')
    }
}
