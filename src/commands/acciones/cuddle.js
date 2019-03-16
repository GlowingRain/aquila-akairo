const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const colors = require('../../utils/colors');

// Nekos.Life
const client = require('nekos.life');
const { sfw } = new client();

class CuddleCommand extends Command {
    constructor() {
        super('cuddle', {
            aliases: ['cuddle'],
            clientPermissions: ['EMBED_LINKS'],
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
            const { url } = await sfw.cuddle()
            const embed = new Discord.RichEmbed()
                .setColor(colors['crimson'])
                .setImage(url)
                .setDescription(`💖 **${message.author.username}** te está acariciando... **${args.user.username}**.`);

            return message.channel.send({ embed });
        } else {
            message.channel.send('Veo que estás solo, vaya sorpresa...')
        };
    }
}

module.exports = CuddleCommand;