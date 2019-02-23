const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const colors = require('../stuff/colors');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'pong']
        });
    }

    async exec(message) {
        const msg = await message.channel.send('¿Ping...?')

        const pingEmbed = new RichEmbed()
        .setTitle('¡Pong! ⏱️')
        .setColor(colors['magenta'])
        .addField('Latencia', `${msg.createdTimestamp - message.createdTimestamp}ms`)
        .addField('API', `${Math.round(this.client.ping)}ms`);

        msg.edit(pingEmbed);
    }
}

module.exports = PingCommand;