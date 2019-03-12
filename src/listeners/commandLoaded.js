const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');
const ora = require('ora');

class CommandLoadedListener extends Listener {
    constructor() {
        super('commandLoaded', {
            emitter: 'commandHandler',
            eventName: 'load',
        })
    }

    exec(mod) {
        let commandLoaded = mod;
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;

        // Create the log itself with Chalk and Moment
        let text = `${timestamp} | Cargando el comando ${chalk.magenta.bold(commandLoaded)}\n`
        const spinner = ora(text).start();
        setTimeout(() => {
            spinner.succeed(`${timestamp} | ${chalk.green.bold('Todos los comandos fueron cargados')}`)
        });
    }
};

module.exports = CommandLoadedListener;