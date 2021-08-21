const { MessageEmbed } = require('discord.js');
const { evaluate } = require('mathjs');

module.exports = {
    name: 'math',
    aliases: ['calc', 'calculate', 'solve'],
    description: 'Solve any maths problem',
    usage: '<math_question>',
    format: ['1 + 1', '2 * 8 / 4 * sin(45)'],

    run: async(client, message, args) => {
        
        try {
            const answer = await evaluate(args.join(' '));

            const mathEmbed = new MessageEmbed()
            .addField('Question', `\`\`\`css\n${args.join(' ')}\n\`\`\``)
            .addField('Answer', `\`\`\`css\n${answer}\n\`\`\``)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

            return message.channel.send({ embeds: [mathEmbed] });
        } catch (error) {
            console.error(error);
            return message.channel.send(`Failed to calculate: \`${error}\``);
        }

    }
}