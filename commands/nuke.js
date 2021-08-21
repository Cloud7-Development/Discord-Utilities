module.exports = {
    name: 'nuke',
    description: 'Deletes and clones a channel',
    usage: '[channel]',
    userPerms: ['MANAGE_CHANNELS'],
    botPerms: ['MANAGE_CHANNELS'],

    run: async(client, message, args) => {
        // if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.react('⚠️');
        
        let channel;
        if(message.mentions.channels.first()){
            channel = message.mentions.channels.first();
        } else {
            channel = message.channel;
        };
        if(channel.type !== 'GUILD_TEXT') return message.react('⚠️');

        try {
           channel.clone(
                {
                    position: channel.rawPosition
                }
            ).then(ch => {
                ch.send(`${message.author.tag} nuked the channel`)
            });
            await channel.delete();
        } catch (error) {
            console.error(error);
            await message.channel.send(`Failed to nuke: \`${error}\``)
        }
    }
}