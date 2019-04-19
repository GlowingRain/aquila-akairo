const { Command } = require('discord-akairo');
const { embedMessage } = require('../../utils/tools');
const { errorMessage, successMessage } = require('../../utils/errors');
const ms = require('ms');

class LockCommand extends Command {
    constructor() {
        super('lock', {
            aliases: ['lock', 'ld'],
            args: [
                {
                    id: 'channel',
                    type: 'channelMention',
                    default: message => message.channel
                },
                {
                    id: 'unlock',
                    match: 'flag',
                    prefix: ['--unlock', '--u']
                }
            ],
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['ADMINISTRATOR']
        })
    }

    exec(message, args) {
        if (!this.client.lockIt) this.client.lockIt = [];
        let channel = args.channel;

        if (args.unlock) {
            return channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: null
            }).then(() => {
                successMessage(`El canal <#${channel.id}> ha sido desbloqueado con éxito.`, message);
            });
        }

        return channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            successMessage(`El canal <#${channel.id}> ha sido bloqueado con éxito.`, message);
        });
    }
}

module.exports = LockCommand;

