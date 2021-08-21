const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const pretty = require('pretty-ms'); 
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: 'view the full information of this server',

    run: async(client, message, args) => {
        // member count values
        const members = message.guild.memberCount;
        const bots    = message.guild.members.cache.filter(m => m.user.bot).size;
        const humans  = message.guild.memebrs.cache.filter(m => !m.user.bot).size;

        // functions
        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };
        
        const vLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            VERY_HIGH: 'Very High'
        };

        const tiers = {
            NONE: '0',
            TIER_1: '1',
            TIER_2: '2',
            TIER_3: '3'
        };

        // final embed
        const serverEmbed = new MessageEmbed()
        .setTitle(`Information for ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(`Guild ID: ${message.guild.id}`)
        
        .addFields(
            {
                name: 'Owner',
                value: message.guild.members.fetch(message.guild.ownerId).user.tag,
                inline: true,
            },
            {
                name: 'Boosts',
                value: `Level ${tiers[message.guild.premiumTier]} (${message.guild.premiumSubscriptionCount === 0 ? "No Boosts" : message.guild.premiumSubscriptionCount})`,
                inline: true,
            },
            {
                name: "\u200b",
                value: "\u200b",
                inline: true
            },
            {
                name: 'Count',
                value: `Total: ${members} | Humans: ${humans} | Bots: ${bots}`,
                inline: true
            },
            {
                name: 'Roles',
                value: message.guild.roles.cache.size,
                inline: true
            },
            {
                name: 'Emojis',
                value: message.guild.emojis.cache.size,
                inline: true
            },
            {
                name: 'Created',
                value: `${moment(message.guild.createdAt).format("MMM Do YYYY")}\n(${pretty(message.guild.createdTimestamp, { verbose: true })})`,
                inline: true
            },
            {
                name: 'Region',
                value: regions[message.guild.region],
                inline: true
            },
            {
                name: 'Verification Level',
                value: vLevels[message.guild.verificationlevel],
                inline: true
            }
        )
        .setColor(message.guild.me.displayHexColor === '#000000' ? "WHITE" : message.guild.me.displayHexColor)

        axios.get(`https://discord.com/api/guilds/${message.guild.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then(res => {
            const { banner } = res.data;
            if(banner){
                const bannerURL = `https://cdn.discordapp.com/banners/${message.guild.id}/${banner}.webp?size=512`;
                await serverEmbed.setImage(bannerURL);

                return message.channel.send({ embeds: [serverEmbed] });
            } else {
                return message.channel.send({ embeds: [serverEmbed] });
            }
        })
    }
}