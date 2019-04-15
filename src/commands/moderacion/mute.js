const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { errorMessage } = require('../../utils/errors');
const colors = require('../../utils/colors');

class MuteCommand extends Command {
    constructor() {
        super('mute', {
            aliases: ['mute'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: "rest"
                }
            ],
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_MESSAGES']
        })
    }

    async exec(message, args) {
        // Args
        let userToMute = args.member;
        let reason = args.reason || 'No se especificó una razón';

        // Channel
        const logChannel = this.client.channels.get('566715176716468224');

        // Role
        let mutedRole = message.guild.roles.find(r => r.name === 'Silenciado');

        if (!mutedRole) {
            let loadingEmoji = this.client.emojis.get('550866071964352524');

            return message.channel.send(`${loadingEmoji} No se ha encontrado el rol \`Silenciado\`, creando rol...`)
                .then(async (msg) => {
                    mutedRole = await message.guild.createRole({
                        name: 'Silenciado',
                        color: colors['darkgrey'],
                        permissions: []
                    });

                    msg.edit(`${loadingEmoji} Modificando permisos por canal...`)
                        .then(async (msg) => {
                            message.guild.channels.forEach(async (channel, id) => {
                                await channel.overwritePermissions(mutedRole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    CONNECT: false
                                });
                            });

                            msg.edit('✅ El rol se ha creado con éxito.')
                        });
                });
        };

        // Parsing
        if (!userToMute) return errorMessage('Tienes que mencionar a alguien para mutearlo.', message);
        if (userToMute.hasPermission('MANAGE_MESSAGES')) return errorMessage('No puedo interactuar con ese usuario.', message);

        // Embeds
        const logEmbed = new RichEmbed()
            .setTitle('MODERACION - Muteo')
            .setColor(colors['yellow'])
            .setThumbnail(`${userToMute.user.displayAvatarURL}`)
            .setDescription(`${message.author} ha silenciado a ${userToMute.user.tag} por tiempo indefinido en <#${message.channel.id}>.`)
            .addField('Razón', `${reason}`)
            .setTimestamp(new Date());

        const mutedEmbed = new RichEmbed()
            .setAuthor('Has sido muteado por un tiempo indefinido en Altair', userToMute.user.displayAvatarURL)
            .setColor(colors['yellow'])
            .addField('Razón', `${reason}`)
            .addField('Mod/Admin', `${message.author.tag}`)
            .setTimestamp(new Date());

        // Mute then send to the user & log
        await userToMute.addRole(mutedRole.id, reason);

        logChannel.send(logEmbed);
        userToMute.send(mutedEmbed).catch(() => O_o);
    }
}

module.exports = MuteCommand;