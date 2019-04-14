const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const colors = require('../../utils/colors');

// Nekos.Life
const client = require('nekos.life');
const { sfw } = new client();

class KissCommand extends Command {
    constructor() {
        super('kiss', {
            aliases: ['kiss'],
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'user'
                }
            ],
            cooldown: 5000,
            ratelimit: 2
        });
    };

    async exec(message, args) {
        if (args.user === this.client.user) return;
        if (args.user.bot === true) return;
        if (args.user === message.author) return;
        if (args.user) {
            const { url } = await sfw.kiss()
            const embed = new Discord.RichEmbed()
                .setColor(colors['crimson'])
                .setImage(url)
                .setDescription(`💖 **${message.author.username}** te ha dado un beso... **${args.user.username}**.`);

            return message.channel.send({ embed });
        } else {
            message.channel.send('¿Es en serio...?')
        };
    }
}

module.exports = KissCommand;