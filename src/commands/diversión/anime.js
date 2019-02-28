const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const weeb = require('node-weeb');

class AnimeCommand extends Command {
    constructor() {
        super('anime', {
            aliases: ['anime'],
            enabled: false,
            // args: [
            //     {
            //         id: 'animeName',
            //         match: 'text'
            //     }
            // ]
        })
    }

    exec(message, args) {
        weeb.anime('bleach').then(result => {
            let data = JSON.parse(result).data[0];

            const animeEmbed = new RichEmbed()
                .setColor('RANDOM');

            const field = {
                name: 'Descripción',
                value: `${data.attributes.synopsis}`,
                inline: true,
            };

            animeEmbed.setTitle(`${data.attributes.titles.en}`);
            animeEmbed.fields.push(field);
            return message.channel.send(animeEmbed);
        });
    }
}

module.exports = AnimeCommand;