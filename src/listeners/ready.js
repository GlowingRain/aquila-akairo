const { Listener } = require('discord-akairo');
const ascii_text_generator = require('ascii-text-generator');
const { platform } = require('os');
const chalk = require('chalk');
const { table } = require('table');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec() {
        // Platform
        let runningOn;
        if (platform() === 'win32') runningOn = chalk.blue('Windows');
        if (platform() === 'linux') runningOn = chalk.green('Linux');

        // Ascii Text
        let aquila = "Aquila";
        let aquila_ascii = ascii_text_generator(aquila, "2");

        // Linezzz
        let line = '-'

        // Some data to log with Aquila 
        let AquilaData = [
            ['Tag', 'Version', 'Prefix', 'Platform'],
            [
                chalk.magenta(this.client.user.tag),
                chalk.bgRed(process.env.VERSION),
                chalk.green(process.env.PREFIX),
                chalk.blue(runningOn)
            ]
        ];

        // Log everything (chalk indeed uwu)
        let output = table(AquilaData);
        console.log(chalk.magenta(aquila_ascii));
        console.log(line.repeat(50));
        console.log(output);
    }
}

module.exports = ReadyListener;