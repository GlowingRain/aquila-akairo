const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');

class CommandErrorListener extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            eventName: 'error'
        })
    }

    exec(command, error) {
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;

        // Create the log itself with Chalk and Moment
        let log = `${timestamp} | ${chalk.bgRed.bold(`ERROR - ${error}`)} | ${command.stack}`

        console.log(log);
    }
}

module.exports = CommandErrorListener;