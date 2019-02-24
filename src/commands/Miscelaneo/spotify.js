const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { errorMessage, warnMessage } = require('../../modules/errors');
const { green } = require('../../modules/colors');
const Canvas = require('canvas');

class SpotifyCommand extends Command {
    constructor() {
        super('spotify', {
            aliases: ['spotify'],
            channelRestriction: 'guild',
            args: [
                {
                    id: 'beta',
                    match: 'flag',
                    prefix: '--beta'
                }
            ]
        });
    }

    async exec(message, args) {

        let user = message.mentions.users.first() || message.author;

        let trackImg = user.presence.game.assets.largeImageURL;
        let trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
        let trackName = user.presence.game.details;
        let trackAlbum = user.presence.game.assets.largeText;
        let trackAuthor = user.presence.game.state;
        
        if (!user.presence.game) return;

        if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
                const embed = new RichEmbed()
                    .setAuthor(`Spotify | ${user.username}#${user.discriminator}`, 'https://www.iosicongallery.com/icons/spotify-music-2015-07-30/512.png')
                    .setColor(green)
                    .setThumbnail(trackImg)
                    .setDescription(`\`🎵\` | Nombre - **\`${trackName}\`**\n` +
                        `\`🎤\` | Autor(es) - **\`${trackAuthor}\`**\n` +
                        `\`📀\` | Álbum - **\`${trackAlbum}\`**\n\n` +
                        `\`🔊\` **Escucha esta canción en [Spotify](${trackUrl})**    
                    `);
        };

        if (args.beta) {
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');

            const background = await Canvas.loadImage('/src/stuff/bg.jpg');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            const attachment = new Discord.Attachment(canvas.toBuffer(), 'bg.jpg');

            return message.channel.send(attachment);
        }

        return message.channel.send(embed);
    }
}

module.exports = SpotifyCommand;