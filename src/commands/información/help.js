// Some useful things I defined in a utility file (see CommonUtil.js in the next Gist file)
const { CommonUtil } = require('../../utils/CommandUtil');
const colors = require('../../utils/colors');

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
        const embed = new RichEmbed();
        this.handler.categories.forEach((cmd, cat) => {
            const field = {
                name: cat.toTitleCaseAll(),
                value: '',
                inline: false,
            };

            cmd.forEach((cmd2) => {
                field.value += `\`${cmd2.aliases[0]}\`\n`
            });

            field.value = `${field.value}`;
            embed.fields.push(field);
        });

        embed.setColor(colors['magenta']);
        return embed;
    };

    _getCmdInfo(msg, cmd) {
        const embed = new RichEmbed();
        const p = cmd.prefix || this.handler.prefix(msg);
        embed.title = `\`${p}${cmd.aliases[0]}\``;
        embed.description = cmd.description;
        
        if (cmd.args) {
            embed.fields.push({
                name: 'Argumentos',
                value: `Tipo: *${cmd.type}*\nPredeterminado: ${cmd.default}`,
                inline: true,
            })
        };

        embed.setColor(colors['mediumpurple']);
        return embed;
    }

    exec(message, args) {
        if (args.key) {
            // Find command or category
            const key = args.key.toLowerCase();
            if (this.handler.modules.has(key)) { // Found a command
                const cmd = this.handler.modules.get(key);
                return message.util.send(`Here is some help for the **${key}** command`,
                    { embed: this._getCmdInfo(message, cmd) });
            }
            else {
                return message.util.send(`No pude encontrar comandos llamados **${key}**`);
            }
        }
        // List all categories if none was provided
        return message.util.send('**Aquí hay una lista de todos los comandos por categoría:**',
            { embed: this._getFullList(message) });
    }
}

module.exports = HelpCommand;