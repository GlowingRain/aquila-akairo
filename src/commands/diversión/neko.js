const { Command } = require('discord-akairo');
const Discord = require('discord.js');

// Nekos.Life
const client = require('nekos.life');
const { sfw } = new client();

class SmugCommand extends Command {
    constructor() {
        super('neko', {
            aliases: ['neko'],
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
        const { url } = await sfw.neko() || sfw.nekoGif()
        const embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setImage(url);

        if (args.user) {
            embed.setDescription(`⚜ ¡**${message.author.username}** pidió una neko para **${args.user.username}**!`);
        } else {
            embed.setDescription(`⚜ ¡**${message.author.username}** pidió una neko!`);
        }

        return message.channel.send({ embed });
    };
}


module.exports = SmugCommand;