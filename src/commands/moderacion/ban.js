const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { crimson } = require('../../utils/colors');
const { errorMessage } = require('../../utils/errors');
const { randomValue } = require('../../utils/tools');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'reason',
                    type: 'string',
                    default: 'No se especificó una razón.'
                }
            ],
            channelRestriction: 'guild',
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS']
        })
    }

    exec(message, args) {
        // Channel
        const logChannel = message.guild.channels.find(ch => ch.name === 'mod-log' || 'mod-logs' || 'logs');

        // Member-User
        let member = args.member;
        let user = member.user;
        let reason = args.reason;

        // Parsing
        if (!logChannel) return errorMessage('El canal de logs no existe o no tengo acceso a él.', message);
        if (member.hasPermmision('MANAGE_MESSAGES')) return errorMessage('No puedo interactuar con ese miembro', message);

        // Text array
        const textArray = [
            ` ha lanzado el martillo sobre ${member}`,
            ` ha destruido a ${member} con el martillo.`,
            ` se mareó al intentar banear a ${member}`,
            ` hizo de las suyas y baneó a ${member}`,
            ` lo hizo una vez más y amasó a ${member} con el martillo.`,
            ` hizo caso y baneó a ${member}`,
            ` hizo lo que tenía que hacer y baneó a ${member}`
        ];

        // Embeds
        const LogEmbed = new RichEmbed()
            .setColor(crimson)
            .setTitle('MODERACIÓN')
            .setImage(user.displayAvatarURL)
            .setDescription(message.author + randomValue(textArray) + `\n\nID: ${member.id}`)
            .addField('Acción', '`BAN`')
            .addField('Razón', `${reason}`, true)
            .setTimestamp(new Date());

        const userEmbed = new RichEmbed()
            .setColor(crimson)
            .setAuthor('Has sido baneado de Altair', `${user.displayAvatarURL}`)
            .addField("Razón", `${reason}`, true)
            .addField("Mod/Admin", `${message.author.tag}`, true);

        // Send then ban
        member.send(userEmbed)
            .then(() => {
                member.ban(reason)
            })
            .catch(() => {
                member.ban(reason)
            });
    }
}

module.exports = BanCommand