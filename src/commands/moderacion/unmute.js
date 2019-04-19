const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { errorMessage, successMessage } = require('../../utils/errors');
const colors = require('../../utils/colors');

class UnmuteCommand extends Command {
    constructor() {
        super('unmute', {
            aliases: ['unmute'],
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
        // const logChannel = this.client.channels.get('566715176716468224');
        let memberToMute = args.member;
        let reason = args.reason || 'No se especificó una razón';
        
        const logChannel = this.client.channels.get('568682783803703299');

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

        if (!memberToMute.roles.has(mutedRole.id)) return errorMessage('Ese usuario no está silenciado.', message);
        if (!memberToMute) return errorMessage('Tienes que mencionar a alguien para desmutearlo.', message);

        const logEmbed = new RichEmbed()
            .setTitle('MODERACION - Desmuteo')
            .setColor(colors['yellow'])
            .setThumbnail(`${memberToMute.user.displayAvatarURL}`)
            .setDescription(`${message.author} ha desmuteado a ${memberToMute.user.tag} en <#${message.channel.id}>.`)
            .addField('Razón', `${reason}`)
            .setTimestamp(new Date());

        const mutedEmbed = new RichEmbed()
            .setAuthor('Has sido desmuteado en Altair', memberToMute.user.displayAvatarURL)
            .setColor(colors['yellow'])
            .addField('Razón', `${reason}`)
            .addField('Mod/Admin', `${message.author.tag}`)
            .setTimestamp(new Date());

        await memberToMute.removeRole(mutedRole.id);

        successMessage(`El usuario ${memberToMute} ha sido desmuteado con éxito.`, message);

        logChannel.send(logEmbed);
        memberToMute.send(mutedEmbed).catch(() => O_o);
    }
}

module.exports = UnmuteCommand;

