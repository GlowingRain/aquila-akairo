const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');

class CommandReloadedListener extends Listener {
    constructor() {
        super('commandReloaded', {
            emitter: 'commandHandler',
            eventName: 'reload',
        })
    }

    exec(mod) {
        let commandReloaded = mod;
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;

        // Create the log itself with Chalk and Moment
        let log = `El comando ${chalk.red.bold(commandReloaded)} se ha recargado.`;

        // Log it
        console.log(`${timestamp} | ${log}`);
    }
};

module.exports = CommandReloadedListener;