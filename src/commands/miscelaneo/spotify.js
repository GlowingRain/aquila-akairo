const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { errorMessage } = require('../../utils/errors');
const { green } = require('../../utils/colors');

class SpotifyCommand extends Command {
    constructor() {
        super('spotify', {
            aliases: ['spotify'],
            channelRestriction: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: message => message.author
                }
            ],
            clientPermissions: ['EMBED_LINKS']
        });
    }

    async exec(message, args) {
        const embed = new Discord.RichEmbed();
        const user = args.user;

        if (args.user) {
            if (!user.presence.game) return;
            if (!user.presence.game.name !== 'Spotify' && !user.presence.game.type === 2) return;

            if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
                let trackImg = user.presence.game.assets.largeImageURL;
                let trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
                let trackName = user.presence.game.details;
                let trackAlbum = user.presence.game.assets.largeText;
                let trackAuthor = user.presence.game.state;
                embed.setAuthor(`Spotify de ${user.username}`, 'https://www.iosicongallery.com/icons/spotify-music-2015-07-30/512.png')
                embed.setColor(green)
                embed.setThumbnail(trackImg)
                embed.setDescription(`\`🎵\` | Nombre - **\`${trackName}\`**\n` +
                    `\`🎤\` | Autor(es) - **\`${trackAuthor}\`**\n` +
                    `\`📀\` | Álbum - **\`${trackAlbum}\`**\n\n` +
                    `\`🔊\` **Escucha esta canción en [Spotify](${trackUrl})**    
                    `);

                return message.channel.send(embed).catch(e => {
                    errorMessage('Puede ser que se esté reproduciendo una canción no registrada.', message);
                });
            };
        }
    }
}

module.exports = SpotifyCommand;