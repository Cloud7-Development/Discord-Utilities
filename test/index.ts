import { Client, Collection } from "discord.js";

const client = new Client({
    intents: 32767
});

client.commands = new Collection();
// command handler goes here

client.on('messageCreate', async(message) => {
    if(message.content === 'hi'){
        message.reply('Hello!')
    }
});

client.login('hahahahahahahahhahahahahhahaha.lolololol.kekboom');
