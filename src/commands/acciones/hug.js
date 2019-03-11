const { Command } = require('discord-akairo');
const Discord = require('discord.js');

// Nekos.Life
const client = require('nekos.life');
const { sfw } = new client();

class HugCommand extends Command {
    constructor() {
        super('hug', {
            aliases: ['hug'],
            clientPermissions: 'EMBED_LINKS',
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
            const { url } = await sfw.hug()
            const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setImage(url)
                .setDescription(`💖 **${args.user.username}**, has sido abrazado/a por **${message.author.username}**.`);

            return message.channel.send({ embed });
        } else {
            message.channel.send('Veo que estás solo, vaya sorpresa...')
        };
    }
}

module.exports = HugCommand;