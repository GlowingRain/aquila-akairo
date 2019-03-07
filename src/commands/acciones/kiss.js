const { Command } = require('discord-akairo');
const Discord = require('discord.js');

// Nekos.Life
const client = require('nekos.life');
const { sfw } = new client();

class KissCommand extends Command {
    constructor() {
        super('kiss', {
            aliases: ['kiss'],
            clientPermissions: ['ATTACH_FILES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'user'
                }
            ]
        });
    };

    async exec(message, args) {
        if (args.user === this.client.user) return;
        if (args.user.bot === true) return;
        if (args.user === message.author) return;
        if (args.user) {
            const { url } = await sfw.kiss()
            const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setImage(url)
                .setDescription(`💖 **${message.author.username}** te ha dado un beso... **${args.user.username}**.`);

            return message.channel.send({ embed });
        } else {
            message.channel.send('¿Es enserio...?')
        };
    }
}

module.exports = KissCommand;