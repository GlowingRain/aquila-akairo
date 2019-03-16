// Some useful things I defined in a utility file (see CommonUtil.js in the next Gist file)
const { CommonUtil } = require('../../utils/CommandUtil');
const colors = require('../../utils/colors');

// Mine
const { errorMessage, warnMessage } = require('../../utils/errors');

// Translations
const permissions = require('../../translations/permissions');
const channels = require('../../translations/channels');

// Required things for using Embeds and extending Akairo Command
const { RichEmbed } = require('discord.js');
const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            // define arg properties
            args: [
                {
                    id: 'key',
                    type: 'string',
                    match: 'content',
                    default: null,
                },
            ],
            // command description
            description: 'Get a list of modules or commands, or details about a specific command.',
        });
    }

    _getFullList(msg) {
        const embed = new RichEmbed()
            .setFooter('Aquila v' + process.env.VERSION)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setTimestamp(new Date());

        this.handler.categories.forEach((cmd, cat) => {
            const field = {
                name: cat.toTitleCaseAll(),
                value: '',
                inline: false,
            };

            cmd.forEach((cmd2) => {
                let cmdName = cmd2.aliases[0];
                field.value += `\`${cmdName}\`\n`
                field.inline = true;
            });

            field.value = `${field.value}`;
            embed.fields.push(field);
        });

        embed.setColor(colors['magenta']);
        return embed;
    };

    _getCmdInfo(msg, cmd) {
        const embed = new RichEmbed()
            .setFooter('Aquila v' + process.env.VERSION)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setTimestamp(new Date());

        embed.title = `Información sobre ${cmd.aliases[0]}`;
        embed.description = cmd.description ? cmd.description : 'No hay una descripción para este comando.';

        if (cmd.aliases) {
            embed.addField('Alias', `\`${cmd.aliases.join(', ')}\``, true)
        }

        if (cmd.channelRestriction) {
            embed.addField('Restricción', `\`${channels[cmd.channelRestriction]}\``, true)
        }

        if (cmd.clientPermissions) {
            embed.addField('Permisos', `\`${permissions[cmd.clientPermissions]}\``, true)
        }

        if (cmd.userPermissions) {
            embed.addField('Permisos de miembro', `\`${permissions[cmd.userPermissions]}\``, true)
        }

        embed.setColor(colors['mediumpurple']);
        return embed;
    }

    exec(message, args) {
        if (args.key) {
            // Find command or category
            const key = args.key.toLowerCase();

            if (this.handler.modules.has(key)) {
                // Found a command
                const cmd = this.handler.modules.get(key);
                return message.author.send(`Aquí hay información sobre el comando **\`${key}\`**`, { embed: this._getCmdInfo(message, cmd) })
                    .catch(O_o => {
                        errorMessage('No puedo enviarte mis comandos, revisa tus opciones de privacidad.', message);
                    });
            } else {
                return warnMessage(`No pude encontrar comandos llamados **${key}**`, message);
            }
        }

        // List all categories if none was provided
        return message.author.send('**Aquí hay una lista de todos los comandos por categoría:**', { embed: this._getFullList(message) })
            .catch(O_o => {
                errorMessage('No puedo enviarte mis comandos, revisa tus opciones de privacidad.', message);
            });
    }
}

module.exports = HelpCommand;