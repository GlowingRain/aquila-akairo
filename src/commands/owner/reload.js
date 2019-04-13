const { Command } = require('discord-akairo');
const { embedMessage } = require('../../utils/tools');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'r'],
            description: 'Recarga los módulos de Aquila',
            args: [
                {
                    id: 'commandID'
                },
                {
                    id: 'all',
                    match: 'flag',
                    prefix: '--all'
                },
                {
                    id: 'load',
                    match: 'flag',
                    prefix: '--load'
                }
            ],
            ownerOnly: true,
            prefix: '-',
        });
    }

    exec(message, args) {
        // If all
        if (args.all) {
            this.handler.reloadAll()
            return embedMessage(message, '**Se ha recargado todo.**')
        }

        // If loadAll
        if (args.load) {
            return embedMessage(message, '**Todos los módulos van a ser cargados de vuelta en breves momentos...**')
                .then(this.handler.removeAll()).then(this.handler.loadAll());
        }

        // If command (default)
        this.handler.reload(args.commandID);
        return embedMessage(message, `Se ha recargado el comando **\`${args.commandID}\`**`)
    }
}

module.exports = ReloadCommand;