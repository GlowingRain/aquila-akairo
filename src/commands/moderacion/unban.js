const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { green } = require('../../utils/colors');
const { errorMessage, successMessage } = require('../../utils/errors');

class UnBanCommand extends Command {
    constructor() {
        super('unban', {
            aliases: ['unban'],
            args: [
                {
                    id: 'user',
                    type: word => {
                        if (!word || isNaN(word)) return null;
                        return word;
                    }
                }
            ],
            channelRestriction: 'guild',
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS']
        })
    }

    async exec(message, args) {
        // Channel
        const logChannel = this.client.channels.get('566715176716468224');

        // Member-User
        let user = args.user;

        // Parsing
        if (!logChannel) return errorMessage('El canal de logs no existe o no tengo acceso a él.', message);
        if (!user) return errorMessage('Especifica una ID para desbanear.', message);

        // Embeds
        const logEmbed = new RichEmbed()
            .setColor(green)
            .setTitle('MODERACIÓN')
            .setDescription(`La ID \`${user}\` ha sido desbaneada por ${message.author}`)
            .addField('Acción', '`UNBAN`', true)
            .addField('Canal', `<#${message.channel.id}>`, true)
            .setTimestamp(new Date());

        // Unban
        await message.guild.unban(user)
            .then(() => {
                successMessage(`La ID \`${user}\` ha sido desbaneada con éxito.`, message);
                logChannel.send(logEmbed);
            })
            .catch(() => {
                errorMessage(`La ID no está en la lista de baneados.`, message);
            });
    }
}

module.exports = UnBanCommand;