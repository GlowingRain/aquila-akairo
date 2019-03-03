const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { red } = require('../../utils/colors');

class RebootCommand extends Command {
    constructor() {
        super('reboot', {
            aliases: ['reboot'],
            ownerOnly: true,
            prefix: '-'
        })
    }

    exec(message) {

        const rebootEmote = this.client.emojis.get('550866071964352524');

        function reboot() {
            process.exit(0)
        };

        const embed = new RichEmbed()
            .setColor(red)
            .setDescription(`${rebootEmote} **__Aquila__ se va a reiniciar en 5 segundos...**`);

        message.channel.send(embed)
        return setTimeout(reboot, 5000);
    }
}

module.exports = RebootCommand;