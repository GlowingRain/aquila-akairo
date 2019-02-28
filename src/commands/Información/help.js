// Some useful things I defined in a utility file (see CommonUtil.js in the next Gist file)
const CommonUtil = require('../../utils/CommandUtil');
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

    // Returns a list of all command categories, and also a list of commands for each category
    _getFullList(msg) {
        const embed = new RichEmbed();
        this.handler.categories.forEach((v, k) => {
            const field = {
                name: k.toTitleCaseAll(),
                value: '',
                inline: true,
            };
            v.forEach((v2) => {
                const p = v2.prefix || this.handler.prefix(msg);
                field.value += `\`${CommonUtil.emoji.enabled[v2.enabled]} ${v2.aliases.shift()}\`\n`;
            });
            field.value = `${field.value}`;
            embed.fields.push(field);
        });
        embed.color = 0xFF00FF;
        return embed;
    }

    // Returns an embed listing all the command (and aliases) available for a given category
    _getCmdList(msg, cat) {
        const embed = new RichEmbed();
        cat.forEach((v, k) => {
            const p = v.prefix || this.handler.prefix(msg);
            const field = {
                name: `${p}${k}`,
                value: `\`${CommonUtil.emoji.enabled[v.enabled]} ${p}${v.aliases.join(`, ${p}`)}\`\n`,
                inline: true,
            };
            v.args.forEach((v2) => {
                field.value += `*${v2.type}* ${v2.id} (${v2.default()})\n`;
            });
            field.value = `${field.value}`;
            embed.fields.push(field);
        });
        embed.color = parseInt(colors['purple']);
        return embed;
    }

    // Returns an embed with a command description, aliases, and fields describing the arguments of a given command
    _getCmdInfo(msg, cmd) {
        const embed = new RichEmbed();
        const p = cmd.prefix || this.handler.prefix(msg);
        embed.title = `\`${p}${cmd.aliases.join(` / ${p}`)}\``;
        embed.description = cmd.description;
        cmd.args.forEach((v) => {
            embed.fields.push({
                name: v.id,
                value: `Type: *${v.type}*\nDefault: ${v.default()}`,
                inline: true,
            });
        });
        embed.color = parseInt(colors['violet']);
        return embed;
    }

    exec(message, args) {
        if (args.key) {
            // Find command or category
            const key = args.key.toLowerCase();
            if (this.handler.categories.has(key)) { // Found a category
                const cat = this.handler.categories.get(key);
                return message.util.send(`Here is a list of commands in the **${key.toTitleCaseAll()}** category`,
                    { embed: this._getCmdList(message, cat) });
            }
            else if (this.handler.modules.has(key)) { // Found a command
                const cmd = this.handler.modules.get(key);
                return message.util.send(`Here is some help for the **${key}** command`,
                    { embed: this._getCmdInfo(message, cmd) });
            }
            else {
                return message.util.send(`Could not find any categories or commands named **${key}**`);
            }
        }
        // List all categories if none was provided
        return message.util.send('Here is a list of all the categories',
            { embed: this._getFullList(message) });
    }
}

module.exports = HelpCommand;