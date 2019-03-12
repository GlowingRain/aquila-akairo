const { Command } = require('discord-akairo');

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
            ],
            ownerOnly: true,
            prefix: '-',
        });
    }

    exec(message, args) {
        
        // If all
        if (args.all) {
            this.handler.reloadAll();
            return message.channel.send('**Se ha recargado todo.**');
        }

        // If command (default)
        this.handler.reload(args.commandID);
        return message.channel.send(`**Se recargó el comando \`${args.commandID}\`**`);
    }
}

module.exports = ReloadCommand;