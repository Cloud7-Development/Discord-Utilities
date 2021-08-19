const { Client } = require('discord.js');
const client = require('../index'); // importing client from index.js
const { prefix } = require('../config.json');

/**
 * @param {Client}: bot
 */

client.on('ready', async() => {
    // logging the bot's online status
    console.log(`${client.user.tag} is online`)

    // bot's activity status
    client.user.setActivity(
        `${prefix}help`,
        {
            type: 'LISTENING'
        }
    )
});