const { Command } = require('discord-akairo');
const { errorMessage } = require('../../utils/errors');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'r'],
            args: [
                {
                    id: 'commandID'
                },
                {
                    id: 'all',
                    match: 'flag',
                    prefix: '--all'
                },
            ],
            ownerOnly: true,
            prefix: '-'
        });
    }

    exec(message, args) {
        if (args.all) {
            this.handler.reloadAll();
            return message.channel.send('**Se ha recargado todo.**').then(
                this.client.logger.warn('El CommandHandler ha recargado todos los comandos')
            );
        };

        this.handler.reload(args.commandID);
        return message.channel.send(`**Se recargó el comando \`${args.commandID}\`**`);
    }
}

module.exports = ReloadCommand;