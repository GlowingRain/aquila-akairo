const { Command } = require('discord-akairo');
const Discord = require('discord.js');

// Nekos.Life
const client = require('nekos.life');
const { sfw } = new client();

class SlapCommand extends Command {
    constructor() {
        super('slap', {
            aliases: ['slap'],
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
            const { url } = await sfw.slap()
            const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setImage(url)
                .setDescription(`💫 **${message.author.username}** le ha dado una bofeteada a **${args.user.username}**.`);

            return message.channel.send({ embed });
        } else {
            message.channel.send('¡Menciona a quién abofetear!')
        };
    }
}

module.exports = SlapCommand;