module.exports = {
    name: 'purge',
    aliases: ['clear', 'prune'],
    description: 'Clears given amount of messages in the channel',
    usage: '<number>',
    userPerms: ['MANAGE_MESSAGES'],
    botPerms: ['MANAGE_MESSAGES'],

    run: async(message, args) => {
        // if(!message.member.permissions.has('MANAGE_MESSAGES'))
        // return message.channel.send('You need `Manage Message` permission to use the purge command.');

        if(!args[0]) return message.channel.send('You need to specify the number of messages to purge!');
        if(isNaN(args[0])) return message.react('⚠️');
        if(args[0] > 99 || args[0] < 1) return message.react('⚠️');
        
        try {
            await message.channel.bulkDelete(
                await message.channel.messages.fetch({ limit: Math.abs(parseInt(args[0])) + 1 })
            ).catch(err => {
                console.error(err);
                message.react('‼️');
            });
            message.channel.send(`Cleared \`${args[0]}\` messages`)

        } catch (error) {
            message.channel.send(`Failed to clear messages: \`${error}\``)
            console.error(error);
        }
    }

}
