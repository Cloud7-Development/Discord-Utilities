const { readdirSync } = require('fs');

module.exports = async(client) => {
    // looping through files in 'commands' folder
    const Files = readdirSync("../commands/").filter(file => file.endsWith('.js'));

    for(const file in Files){
        const command = require(`../commands/${file}`);

        // setting the key of command name and command details in 'client.commands' collection
        if(command.name) {
        client.commands.set(command.name, command);
        };

        if(command.aliases && Array.isArray(command.aliases)){
            command.aliases.forEach((alias) => {
                client.aliases.set(alias, command.name);
            });
        }
    }
}