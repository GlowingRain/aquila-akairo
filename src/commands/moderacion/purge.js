const { Command } = require('discord-akairo');
const { errorMessage, successMessage } = require('../../utils/errors');

class PurgeCommand extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'clean', 'prune'],
            args: [
                {
                    id: 'count',
                    type: 'integer'
                }
            ],
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            channelRestriction: 'guild'
        })
    }

    async exec(message, args) {
        const amount = args.count + 1;

        if (amount <= 1 || amount > 100) {
            return errorMessage('Necesitas ingresar un número de mensajes a borrar, del 1 al 99.', message);
        }

        await message.channel.fetchMessages({
            limit: amount
        }).then(messages => {
            message.channel.bulkDelete(messages, true);
            successMessage(`Se borraron **${amount}** mensajes.`, message).then(msg => msg.delete(5000));
        });
    }
}

module.exports = PurgeCommand;