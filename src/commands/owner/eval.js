const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const hastebin = require('hastebin-gen');

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'e'],
            args: [{ id: 'code', match: 'text' }],
            ownerOnly: true,
            prefix: '-'
        });
    }

    exec(message, args) {
        try {
            let codein = args.code;
            let code = eval(codein);

            if (typeof code !== 'string') { 
                code = require('util').inspect(code, { depth: 0 }); 
            };

            let embed = new Discord.RichEmbed()
                .setAuthor('Evaluación')
                .setColor('RANDOM')
                .addField(':inbox_tray: Entrada', `\`\`\`js\n${codein}\`\`\``)
                .addField(':outbox_tray: Salida', `\`\`\`js\n${code}\n\`\`\``);
            
            if (code.length > 2000) {
                hastebin(code, "js").then(r => {
                    return message.channel.send(`El límite de carácteres fue excedido, por lo que he puesto el output en un [link de Hastebin...](${r}) :sweat_smile:`)
                });
            };

            message.channel.send(embed);

        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
        }

    }
}

module.exports = EvalCommand;