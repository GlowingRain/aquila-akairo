const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { crimson } = require('../../utils/colors');
const { errorMessage, successMessage } = require('../../utils/errors');
const { randomValue } = require('../../utils/tools');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    match: 'word'
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: "rest"
                }
            ],
            channelRestriction: 'guild',
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS']
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

        // Text array
        const textArray = [
            ` ha lanzado el martillo sobre ${member.tag}`,
            ` ha destruido a ${member.tag} con el martillo.`,
            ` se mareó al intentar banear a ${member.tag}`,
            ` hizo de las suyas y baneó a ${member}`,
            ` lo hizo una vez más y amasó a ${member.tag} con el martillo.`,
            ` hizo caso y baneó a ${member.tag}`,
            ` hizo lo que tenía que hacer y baneó a ${member.tag}`
        ];

        // Embeds
        const LogEmbed = new RichEmbed()
            .setColor(crimson)
            .setTitle('MODERACION - Ban')
            .setThumbnail(user.displayAvatarURL)
            .setDescription(message.author + randomValue(textArray) + `\n\nID: ${member.id}`)
            .addField('Razón', `${reason}`, true)
            .addField('Canal', `<#${message.channel.id}>`, true)
            .setTimestamp(new Date());

        const userEmbed = new RichEmbed()
            .setColor(crimson)
            .setAuthor('Has sido baneado de Altair', `${user.displayAvatarURL}`)
            .addField("Razón", `${reason}`, true)
            .addField("Mod/Admin", `${message.author.tag}`, true)
            .setTimestamp(new Date());

        // Send then ban
        await member.send(userEmbed)
            .then(() => {
                successMessage(`${user.tag} ha sido baneado con éxito.`, message);
                return member.ban(reason);
            })
            .catch(() => {
                successMessage(`${user.tag} ha sido baneado con éxito.`, message);
                return member.ban(reason);
            });

        LogChannel.send(LogEmbed);
    }
}

module.exports = BanCommand;