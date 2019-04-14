const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');
const { errorMessage } = require('../../utils/errors');

class CommandErrorListener extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            eventName: 'error'
        })
    }

    exec(error, message, command) {
        // Timestamp
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;

        // Create the log itself with Chalk and Moment
        let log = `${timestamp} | ${chalk.bgRed.bold(`ERROR - ${command}`)} | ${error.stack}`;

        // Send the error then log it
        errorMessage(`Ha habido un error con ese comando: ***\`${error.message}\`***`, message);
        console.log(log);
    }
}

module.exports = CommandErrorListener;