const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const moment = require('moment');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'ui', 'user'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: message => message.author
                },
            ],
            channelRestriction: 'guild'
        });
    }

    exec(message, args) {
        let user = args.user;
        let member = message.guild.member(user);

        const embed = new Discord.RichEmbed()
            .setColor(member.highestRole.hexColor)
            .setTitle(`Información sobre ${user.username}`)
            .setThumbnail(`${user.displayAvatarURL}`)
            .addField('Nombre & Tag', `${user.tag}`, true)
            .addField('ID', `${user.id}`, true)
            .addField('Apodo', `${member.nickname ? member.nickname : 'Ninguno'}`, true)
            .addField('¿Bot?', `${user.bot ? 'Sí' : 'No'}`, true)
            .addField('Creado el', `${moment.utc(user.createdAt).format('DD/MM/YYYY')}`, true)
            .addField('Se unió el', `${moment.utc(member.joinedAt).format('DD/MM/YYYY')}`, true)
            .addField('Roles', member.roles.map(roles => `\`${roles.name}\``).join(', '), false);

        message.channel.send({embed});
    }
}

module.exports = UserInfoCommand;