const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const colors = require('../../utils/colors');
const { errorMessage, successMessage } = require('../../utils/errors');
const { embedMessage } = require('../../utils/tools');

class AnnounceCommand extends Command {
    constructor() {
        super('announce', {
            aliases: ['announce'],
            args: [
                {
                    id: 'content',
                    match: 'text'
                },
                {
                    id: 'color',
                    match: 'prefix',
                    type: 'color',
                    prefix: '--color=',
                    default: `${colors['magenta']}`
                },
                {
                    id: 'channel',
                    type: 'channelMention',
                    prompt: {
                        start: message => '¿Dónde quieres mandar este anuncio? `(#canal/cancelar)`',
                        retry: message => 'Ese no es un canal válido, inténtalo de vuelta.'
                    },
                }
            ],
            clientPermissions: ['EMBED_LINKS'],
            userPermissions: ['MANAGE_MESSAGES']
        })
    }

    async exec(message, args) {
        const loading = this.client.emojis.get('550866071964352524');
        let channel = args.channel;
        let content = args.content;
        let color = args.color;

        if (!content) return errorMessage('No se encontró el contenido del anuncio.', message);

        let sEmbed = new Discord.RichEmbed()
            .setDescription(`Enviando anuncio... ${loading}`)
            .setColor(colors['magenta']);

        const announce = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`Anuncio de ${message.author.tag}`, message.author.displayAvatarURL)
            .setThumbnail(message.guild.iconURL)
            .setDescription(content)
            .setFooter(message.guild.name)
            .setTimestamp(new Date());

        message.channel.send(sEmbed)
            .then(async msg => {
                await channel.send(announce)
                    .then(() => {
                        sEmbed.setDescription('El anuncio se ha enviado con éxito.');
                        sEmbed.setColor(colors['green']);
                        return msg.edit(sEmbed);
                    })
                    .catch((err) => {
                        sEmbed.setDescription(`El canal \`#${channel.name}\` no existe o no tengo permisos para verlo/enviar mensajes.`);
                        sEmbed.setColor(colors['crimson']);
                        return msg.edit(sEmbed);
                    });
            })
    }
}

module.exports = AnnounceCommand;