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
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;

        // Create the log itself with Chalk and Moment
        let guild;
        let used;
        let user;

        if (message.channel === 'text') {
            if (message.author.id === message.guild.ownerID) {
                user = `${chalk.red('[GUILD OWNER]')} ${message.author.tag} (${message.author.id})`
            }
        }

        if (message.author.id === process.env.OWNER_ID) {
            user = `${chalk.green('[OWNER]')} ${message.author.tag}`
        } else {
            user = `${chalk.gray('[USER]')} ${message.author.tag} (${message.author.id})`
        }

        if (message.channel.type === 'dm') {
            guild = `${chalk.red('DM')}: ${chalk.yellow(message.author.id)}`;
            used = `${chalk.magenta(commandUsed)} ha sido usado por ${user}`;
        } else {
            guild = `${chalk.red('GUILD')}: ${chalk.yellow(message.guild.id)}`;
            used = `${chalk.magenta(commandUsed)} ha sido usado por ${user} en #${message.channel.name}`;
        }

        // Log it
        console.log(`${timestamp} | ${guild} | ${used}`);
    }
};

module.exports = CommandStartedListener;