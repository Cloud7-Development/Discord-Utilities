const { SnowflakeUtil } = require('discord.js');
const ms = require('pretty-ms');

module.exports = {
    name: 'snowflake',
    aliases: ['timedifference', 'time-difference'],
    description: 'Calculates time difference between two given message IDs',
    usage: '<id1> <id2>',

    run: async(client, message, args) => {
        if(!args[0] || !args[1]) return message.react('⚠');
        if(isNaN(args[0]) || isNaN(args[1])) message.react('⚠');

        try {
            const t1 = await SnowflakeUtil.deconstruct(parseInt(args[0])).timestamp;
            const t2 = await SnowflakeUtil.deconstruct(parseInt(args[1])).timestamp;

            message.channel.send(`${ms(Math.abs(t2 - t1) / 1000), { verbose: true }} seconds.\n \n\`${args[0]}\`: <t:${t1 / 1000}:D><t:${t1 / 1000}:T>\n \n\`${args[1]}\`: <t:${t2 / 1000}:D><t:${t2 / 1000}:T>`)
        } catch (error) {
            console.error(error);
            await message.reply(`Unexpected Error: \`${error}\``);
        }
 
    }
}