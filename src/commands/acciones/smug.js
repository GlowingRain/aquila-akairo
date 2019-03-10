const { Command } = require('discord-akairo');
const Discord = require('discord.js');

// Nekos.Life
const client = require('nekos.life');
const { sfw } = new client();

class SmugCommand extends Command {
    constructor() {
        super('smug', {
            aliases: ['smug'],
            clientPermissions: ['ATTACH_FILES', 'EMBED_LINKS'],
        });
    };

    async exec(message) {
        const { url } = await sfw.smug()
        const embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setImage(url)
            .setDescription(`⚜ **${message.author.username}** sonrió de una manera muy engreída...`);

        return message.channel.send({ embed });
    };
}


module.exports = SmugCommand;