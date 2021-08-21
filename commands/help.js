const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Shows list of available commands',
    aliases: ['commands'],
    usage: '[command|category]',
    format: ['ping', 'utility'],

    run: async(client, message, args) => {
        if(!args.length){
            let utility = [];

            const files = readdirSync("./commands/").filter(file => file.endsWith('.js'));
            const commands = files.filter((c) => {
                let file = require(`../commands/${c}`);
                // ignoring hidden commands
                return !file.hidden;
            }).map(cmd => {
                let file = require(`../commands/${cmd}`);
                if(!file.name) return "undefined";

                let name = file.name.replace('.js', '');
                return `\`${name}\``;
            });
            let data = new Object();
            data = {
                name: `Commands List`,
                value: commands.length === 0
                    ? 'Maintenance'
                    : commands.join(', ')
            };

            utility.push(data);

            const helpEmbed = new MessageEmbed()
            .setAuthor(`${client.user.username} commands list`, client.user.displayAvatarURL())
            .setDescription(`Use \`${prefix}help <cmd>\` for additional information on a single command`)
            .addField(utility)
            .setColor(message.guild.me.displayHexColor === '#000000' 
                ? 'WHITE'
                : message.guild.me.displayHexColor)
            .setFooter('Dev・Nin#1111', client.user.displayAvatarURL())

            return message.channel.send({ embeds: [helpEmbed] });
        } else {
            const command = client.commands.get(args[0].toLowerCase()) ||
                            client.commands.get(client.aliases.get(args[0].toLowerCase()));

            if(!command) return message.reply(`No command found with the alias or name \`${command}\`.\nUse \`${prefix}help\` for my commands list!`);

            const commandEmbed = new MessageEmbed()
            .setTitle(`${command.name} details`) 
            .setDescription(command.description ? command.description : 'No Description for this command')
            .addField(`> Aliases`, command.aliases ? command.aliases.join(`, `) : "No Aliases for this command")
            .addField(`> Format`, `${command.usage ? `${prefix}${command.name} ${command.usage}` : `${prefix}${command.name}`} ${command.format ? `\n \nExample:\n${prefix}${command.name} ${Math.floor(Math.random() * command.format.length)}` : '_ _'}`)
            .setFooter('Dev・Nin#1111', client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor === '#000000'
                ? 'WHITE'
                : message.guild.me.displayHexColor)

            return message.channel.send({ embeds: [commandEmbed] });
        }
    }
}