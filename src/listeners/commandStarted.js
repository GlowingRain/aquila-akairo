const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');

class CommandStartedListener extends Listener {
    constructor() {
        super('commandStarted', {
            emitter: 'commandHandler',
            eventName: 'commandStarted',
        })
    }

    exec(message, command) {
        let commandUsed = command;
        let timestamp = `${moment(new Date()).format("DD-MM-YY H:m:s")}`;

        // Create the log itself with Chalk and Moment
        let msg = `[${timestamp}] | ${chalk.red('GUILD')}: ${chalk.yellow(message.guild.id)} | ${chalk.magenta(commandUsed)} ha sido usado por ${message.author.tag} en #${message.channel.name}`;

        // Log it
        console.log(msg);
    }
};

module.exports = CommandStartedListener;