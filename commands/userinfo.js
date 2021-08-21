const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const pretty = require('pretty-ms');
const axios = require('axios');

module.exports = {
    name: 'userinfo',
    aliases: ['whois'],
    description: 'Get information of a user or yourself',
    usage: '[user]',

    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const infoEmbed = new MessageEmbed()
        .setTitle(`Information for ${member.user.username}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: member.user.tag,
                value: `<@!${member.user.id}>`,
                inline: true,
            },
            {
                name: 'Nickname',
                value: `${member.nickname ? member.nickname : "`None`"}`,
                inline: true
            },
            { name: "\u200b", value: "\u200b", inline: true }, // empty field
            {
                name: 'Joined at',
                value: `${moment(member.joinedAt).format("MMM Do YYYY")}\n(${pretty(member.joinedTimestamp, { verbose: true })} ago)`,
                inline: true
            },
            {
                name: 'Created at',
                value: `${moment(member.user.createdAt).format("MMM Do YYYY")}\n(${pretty(member.user.createdTimestamp, { verbose: true })} ago)`,
                inline: true
            },
            { name: "\u200b", value: "\u200b", inline: true },
            {
                name: 'Roles',
                value: member.roles.cache.size === 0 ? 'No roles' : member.roles.map(r => `${r}`).join(', ')
            }
        )
        .setColor(member.displayHexColor === '#000000' ? "WHITE" : member.displayHexColor)
        .setFooter(`ID: ${member.id}`)

        axios.get(`https://discord.com/api/users/${member.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then(res => {
            const { banner } = res.data;
            if(!banner){
                return message.channel.send({ embeds: [infoEmbed] });
            };

            if(banner){
                const extension = banner.startsWith('a_') ? ".gif" : ".png";
                const bannerURL = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=512`;
                infoEmbed.setImage(bannerURL)

                return message.channel.send({ embeds: [infoEmbed] });
            }
        })

    }
}