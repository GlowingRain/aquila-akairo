const { Command } = require('discord-akairo');

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

        this.handler.reload(args.commandID).then(
            this.client.logger.warn(`El comando ${commandID} ha sido recargado con éxito`)
        );
        return message.channel.send(`**Se recargó el comando \`${args.commandID}\`**`);
    }
}

module.exports = ReloadCommand;