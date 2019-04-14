const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const colors = require('../../utils/colors');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'pong'],
        });
    }

    async exec(message) {
        const msg = await message.channel.send('¿Ping...?')

        let ping = msg.createdTimestamp - message.createdTimestamp;
        const pingEmbed = new RichEmbed()
        .setTitle('¡Pong! ⏱️')
        .setColor(colors['magenta'])
        .addField('Latencia', `${ping}ms`, true)
        .addField('API', `${Math.round(this.client.ping)}ms`, true);

        if (ping <= 100) pingEmbed.setDescription('En teoría yo debería estar bien.');
        if (ping > 100) pingEmbed.setDescription('Algo... alto, pero funciono.');
        if (ping > 200) pingEmbed.setDescription('Wow... ¡estoy volando irónicamente!');
        
        msg.edit(pingEmbed);
    }
}

module.exports = PingCommand;