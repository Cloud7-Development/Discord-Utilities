import { Client, Collection } from "discord.js";

const client = new Client({
    intents: 32767
});

client.on('messageCreate', async(message) => {
    if(message.content === 'hi'){
        message.reply('Hello!')
    }
});

client.login('hahahahahahahahhahahahahhahahaha.lolololol.kekboom');