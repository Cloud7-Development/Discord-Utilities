const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'snipe',
    description: 'Snipes last 10 deleted messages in a given channel',
    usage: '[number] [channel]',

    run: async(client, message, args) => {
        let channel;
        if(message.mentions.channels.first()){
            channel = message.mentions.channels.first();
        } else {
            channel = message.channel;
        };

        if(typeof channel !== 'text') return message.reply('Invalid Channel Provided');

        const snipes = client.snipes.get(channel);
        if(!snipes) return message.reply(`Nothing to snipe!`);

        const snipe = +args[0] - 1 || 0;
        const t = snipes[snipe];
        if(!t) return message.reply(`Couldn't snipe further`);

        const { content, member, image, time } = t;

        const snipeEmbed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(content)
            .setImage(image)
            .setFooter(moment(time).fromNow())

        return message.channel.send({ embeds: [snipeEmbed] });
    } 
}