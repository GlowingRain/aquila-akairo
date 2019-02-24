const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const { errorMessage, warnMessage } = require('../../modules/errors');
const { green } = require('../../modules/colors');

class SpotifyCommand extends Command {
    constructor() {
        super('spotify', {
            aliases: ['spotify'],
            channelRestriction: 'guild',

        });
    }

    exec(message) {

        let user = message.mentions.users.first() || message.author;

        if (!user.presence.game) return;

        if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {

            try {
                let trackImg = user.presence.game.assets.largeImageURL;
                let trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
                let trackName = user.presence.game.details;
                let trackAlbum = user.presence.game.assets.largeText;
                let trackAuthor = user.presence.game.state;

                const embed = new RichEmbed()
                    .setAuthor(`Spotify | ${user.username}#${user.discriminator}`, 'https://www.iosicongallery.com/icons/spotify-music-2015-07-30/512.png')
                    .setColor(green)
                    .setThumbnail(trackImg)
                    .setDescription(`
                        \`🎵\` **Nombre de la canción :**  \`${trackName}\`
                        \n\`📀\` **Álbum :**  \`${trackAlbum}\`
                        \n\`🎤\` **Autor(es) :**  \`${trackAuthor}\`
                        
                        \n\`🔊\` **Escucha esta canción en [Spotify](${trackUrl})**
                        `);
                // .addField('Escucha esta canción', `[${trackUrl}](${trackUrl})`, false);

                return message.channel.send(embed);

            } catch (error) {
                return warnMessage('Puede ser que se esté reproduciendo una canción sin registrar.', message);
            };
        };
    }
}

module.exports = SpotifyCommand;