const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const colors = require('../../utils/colors');

class SayCommand extends Command {
    constructor() {
        super('say', {
            aliases: ['say'],
            args: [
                {
                    id: 'content',
                    match: 'text'
                },
                {
                    id: 'embed',
                    match: 'flag',
                    prefix: ['--embed', '--e']
                },
            ],
            clientPermissions: ['MANAGE_MESSAGES']
        });
    };

    exec(message, args) {

        if (args.embed) {
            const embed = new RichEmbed()
                .setDescription(args.content);

            message.delete().catch(O_o => { });
            return message.channel.send(embed);
        }
        
        message.delete().catch(O_o => { });
        message.channel.send(args.content);

    }
}

module.exports = SayCommand;