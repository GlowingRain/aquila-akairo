const { Listener } = require('discord-akairo');
const chalk = require('chalk');
const moment = require('moment');

class BanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'guildBanAdd',
            eventName: 'client'
        })
    }

    exec(user, guild) {
        let bannedUser = user;
        let timestamp = `${moment(new Date()).format("DD-MM-YY HH:mm:ss")}`;
        let guildID = `${chalk.red('GUILD')}: ${chalk.yellow(guild.id)}`;
        
        console.log(`${timestamp} | ${guildID} | ${bannedUser.tag} ha sido baneado de Altair.`);
    }
}

module.exports = BanAddListener;