const { Command } = require('discord-akairo');
const hastebin = require('hastebin-gen');

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            args: [
                {
                    id: 'code'
                }
            ],
            category: 'Owner',
            ownerOnly: true,
            prefix: '!#'
        });
    }

    exec(message, args) {

        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            const code = args.code;
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "js" });


            if (evaled.length > 2000) {
                hastebin(evaled, "js").then(function (r) {
                    return message.channel.send(`The limit has been exceeded, so I made it into a Hastebin link! :sweat_smile:\n${r}`)
                });
            };

        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
        }
    }
}

module.exports = EvalCommand;