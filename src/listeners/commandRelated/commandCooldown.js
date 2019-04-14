const { Listener } = require('discord-akairo');
const { warnMessage } = require('../../utils/errors');
const prettyMs = require('pretty-ms');

class CommandCooldownListener extends Listener {
    constructor() {
        super('commandCooldown', {
            emitter: 'commandHandler',
            eventName: 'commandCooldown'
        })
    }

    exec(message, command, remaining) {
        warnMessage(`Debes esperar \`${prettyMs(remaining)}\` antes de usar el comando \`${command}\``, message);
    }
}

module.exports = CommandCooldownListener;