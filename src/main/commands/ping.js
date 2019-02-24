const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        });
    }

    exec(message) {
        const latency = Math.round(message.createdTimestamp - message.createdTimestamp);

        const PingEmbed = new Discord.RichEmbed()

            .setDescription(`Pong! 🏓`)

            .addField('Websocket', `${Math.round(message.client.ping)}ms`, true)
            .addField('Latency', `${latency}ms`, true)

            .setFooter(`Current bot health is ${latency < 250 ? 'perfect [within 250ms]' : latency < 500 ? 'okay [within 500ms]' : latency > 1000 ? 'lookin\' bad, possible outage [greater than 1000ms]' : 'on the slow side [within 501-999ms]'}`)

        message.channel.send({ embed: PingEmbed });
    }
}

module.exports = PingCommand;