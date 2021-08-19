const client = require('../index');

client.on('messageDelete', async(message) => {
    let snipes = client.snipes.get(message.channel.id) || [];
    
    // storing last 10 deleted messages in the collection. you may increase it as per your wish
    if(snipes.length > 10) snipes = snipes.slice(0, 9);

    snipes.unshift({
        content: message.content,
        member : message.member,
        image  : message.attachments.first() ? message.attachments.first().proxyURL : null,
        time   : Date.now()
    });

    client.snipes.set(message.channel.id, snipes);

})