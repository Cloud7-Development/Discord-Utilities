const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs') // default 'node' module
const { token } = require('./config.json') // importing token from 'config.json'

const client = new Client({ intents: 32767 }) // "32767" is all intents
module.exports = client // exporting client so that we can use it in other files

// declaring commands collection
client.commands = new Collection();
// declaring aliases collection for commands
client.aliases = new Collection();

// making the handler to run stuff
client.categories = readdirSync("./handlers");
["command", "event"].forEach((handler) => {
    // using client for handling commands and events separately
    require(`./handlers/${handler}`)(client);
});

// debugging
client.on('debug', x => console.log(x));
client.on('warn', x => console.log(x));

// finally logging into our bot
client.login(token)