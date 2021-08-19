module.exports = {
    name: 'ping',
    aliases: ['latency'],
    description: 'returns the bot\'s latency to discord',

    run: async(client, message) => {
        const discord = Math.abs(message.createdTimestamp - Date.now());
        const api = client.ws.ping;

        message.reply('Pinging...').then(msg => {
            msg.edit(`Pong! Message Round Trip took ${discord}ms. Heartbeat is ${api}ms.`)
        });
    }
}