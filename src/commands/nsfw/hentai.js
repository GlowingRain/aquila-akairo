const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const colors = require('../../utils/colors');

// Nekos.Life
const client = require('nekos.life');
const { nsfw } = new client();

class RandomHentaiCommand extends Command {
    constructor() {
        super('randomhentai', {
            aliases: ['randomhentai', 'rh', 'r18', 'hentai'],
            channelRestriction: 'guild'
        })
    }

    async exec(message) {
        if (message.channel.nsfw === false) return;

        const { url } = await nsfw.randomHentaiGif();

        const embed = new RichEmbed()
            .setAuthor('Hentai', message.author.displayAvatarURL)
            .setColor(colors['darkred'])
            .setImage(url);

        return message.channel.send(embed);
    }
}

module.exports = RandomHentaiCommand;

