const { glob } = require('glob');
const { promisify } = require('util');
const promise = promisify(glob);


module.exports = async(client) => {
    // looping through files in 'commands' folder
    const Commands = await promise(`${process.cwd}/commands/*.js`);
    Commands.map(command => {
        const file = require(command);

        // setting the key of command name and command details in 'client.commands' collection
        if(file.name) {
            client.commands.set(file.name, file);
            };
    
        if(file.aliases && Array.isArray(file.aliases)){
            file.aliases.forEach((alias) => {
                client.aliases.set(alias, file.name);
            });
        };
    })  
}