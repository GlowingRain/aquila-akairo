const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { orange } = require('../../utils/colors');
const { errorMessage, successMessage } = require('../../utils/errors');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            split: 'sticky',
            args: [
                {
                    id: 'member',
                    type: 'member',
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: "rest"
                }
            ],
            channelRestriction: 'guild',
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS']
        })
    }

    async exec(message, args) {
        // Channel
        const LogChannel = this.client.channels.get('566715176716468224');

        // Member-User
        let member = args.member;
        let user = member.user;
        let reason = args.reason || 'No se especificó una razón.';

        // Parsing
        if (!LogChannel) return errorMessage('El canal de logs no existe o no tengo acceso a él.', message);
        if (!member) return errorMessage('Debes mencionar a un usuario para banearlo.', message);
        if (member.hasPermission('MANAGE_MESSAGES')) return errorMessage('No puedo interactuar con ese usuario.', message);

        // Embeds
        const LogEmbed = new RichEmbed()
            .setColor(orange)
            .setTitle('MODERACION - Expulsión')
            .setThumbnail(user.displayAvatarURL)
            .setDescription(`${message.author} ha expulsado a ${user.tag} en <#${message.channel.id}>` + `\n\nID: ${member.id}`)
            .addField('Razón', `${reason}`)
            .setTimestamp(new Date());

        const userEmbed = new RichEmbed()
            .setColor(orange)
            .setAuthor('Has sido expulsado de Altair', `${user.displayAvatarURL}`)
            .addField("Razón", `${reason}`, true)
            .addField("Mod/Admin", `${message.author.tag}`, true);

        // Send then kick
        await member.send(userEmbed)
            .then(() => {
                successMessage(`${user.tag} ha sido expulsado con éxito.`, message);
                // return member.kick(reason);
            })
            .catch(() => {
                successMessage(`${user.tag} ha sido expulsado con éxito.`, message);
                // return member.kick(reason);
            });

        LogChannel.send(LogEmbed);
    }
}

module.exports = KickCommand;