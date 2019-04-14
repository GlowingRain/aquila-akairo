const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');

class UnhandledRejectionListener extends Listener {
    constructor() {
        super('unhandledRejection', {
            eventName: 'unhandledRejection',
            emitter: 'process'
        });
    }

    exec(error) {
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;

        // Create the log itself with Chalk and Moment
        let log = `${timestamp} | ${chalk.bgRed.bold(`ERROR`)} | ${error}`

        console.log(log);
    }
}

module.exports = UnhandledRejectionListener;