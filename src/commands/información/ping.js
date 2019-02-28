<<<<<<< HEAD:src/commands/información/ping.js
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

        const pingEmbed = new RichEmbed()
        .setTitle('¡Pong! ⏱️')
        .setColor(colors['magenta'])
        .addField('Latencia', `${msg.createdTimestamp - message.createdTimestamp}ms`)
        .addField('API', `${Math.round(this.client.ping)}ms`);

        msg.edit(pingEmbed);
    }
}

=======
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

        const pingEmbed = new RichEmbed()
        .setTitle('¡Pong! ⏱️')
        .setColor(colors['magenta'])
        .addField('Latencia', `${msg.createdTimestamp - message.createdTimestamp}ms`)
        .addField('API', `${Math.round(this.client.ping)}ms`);

        msg.edit(pingEmbed);
    }
}

>>>>>>> 8073f70e433297a796fffc2b467876d2bf8d4c94:src/commands/Información/ping.js
module.exports = PingCommand;