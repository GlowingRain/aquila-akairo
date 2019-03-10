const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: message => message.author
                }
            ],
            clientPermissions: 'EMBED_LINKS',
            channelRestriction: 'guild'
        });
    }

    exec(message, args) {
        let member = message.guild.member(args.user)
        let color = member.highestRole.hexColor;
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`[Link](${args.user.displayAvatarURL})`)
            .setImage(args.user.displayAvatarURL)
            .setFooter(`Avatar de ${args.user.tag}`);

        message.channel.send({ embed });
    }
}

module.exports = AvatarCommand;