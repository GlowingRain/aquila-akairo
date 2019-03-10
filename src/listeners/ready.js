const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec() {
        const client = this.client;
        client.logger.ready(client.user.username + ' está lista para servir a ' + client.users.size + ' usuarios');
    }
}

module.exports = ReadyListener;