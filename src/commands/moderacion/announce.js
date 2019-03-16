const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const colors = require('../../utils/colors');

class AnnounceCommand extends Command {
    constructor() {
        super('announce', {
            aliases: ['announce'],
            args: [
                {
                    id: 'channel',
                    type: 'channelMention',
                    match: 'none',
                    prompt: {
                        start: message => `¿Dónde quieres enviar este anuncio? (Menciona un canal)`,
                        retry: message => `\`${this.args.channel}\` no es un canal válido, o simplemente no tengo acceso a él, prueba de nuevo...`,
                    }
                },
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
                }
            ],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_MESSAGES']
        })
    }

    exec(message, args) {
        let channel = args.channel;
        let content = args.content;
        let color = args.color;

        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`Anuncio de ${message.author.tag}`, message.author.displayAvatarURL)
            .setThumbnail(message.guild.iconURL)
            .setDescription(content)
            .setFooter()
            .setTimestamp(new Date());

        return message.channel.send('Enviando anuncio...')
        .then(msg => {
            channel.send({ embed }).catch(err => {
                    return msg.edit('Ha ocurrido un error al enviar el anuncio.');
                });

            msg.edit('El anuncio fue enviado con éxito.');
        });
    }
}

module.exports = AnnounceCommand;