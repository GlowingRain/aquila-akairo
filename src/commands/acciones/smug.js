const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const colors = require('../../utils/colors');

// Nekos.Life
const client = require('nekos.life');
const { sfw } = new client();

class SmugCommand extends Command {
    constructor() {
        super('smug', {
            aliases: ['smug'],
            clientPermissions: 'EMBED_LINKS',
        });
    };

    async exec(message) {
        const { url } = await sfw.smug()
        const embed = new Discord.RichEmbed()
            .setColor(colors['purple'])
            .setImage(url)
            .setDescription(`⚜ **${message.author.username}** sonrió de una manera muy engreída...`);

        return message.channel.send({ embed });
    };
}


module.exports = SmugCommand;