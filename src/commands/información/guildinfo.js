const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const moment = require('moment');

class GuildInfoCommand extends Command {
    constructor() {
        super('guildinfo', {
            aliases: ['guildinfo', 'sv', 'server'],
            channelRestriction: 'guild'
        });
    }

    exec(message) {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " día" : " días");
        };

        let verifLevels = ["Ninguno", "Bajo", "Medio", "Alto", "Máximo"];
        let region = {
            "brazil": ":flag_br: Brasil",
            "eu-central": ":flag_eu: Europa Central",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. Este",
            "us-south": ":flag_us: U.S. Sur",
            "us-west": ":flag_us: U.S. Oeste",
            "eu-west": ":flag_eu: Europa Occidental",
            "vip-us-east": ":flag_us: VIP U.S. Este",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Rusia",
            "southafrica": ":flag_za: Sudáfrica"
        };

        const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n') || "No se encontraron emojis en este servidor.";
        const emojiEmbed = new Discord.RichEmbed();

        const embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setThumbnail(message.guild.iconURL)
            .setColor('RANDOM')
            .addField("ID", message.guild.id, true)
            .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
            .addField("Región", region[message.guild.region], true)
            .addField("Nivel de Verificación", verifLevels[message.guild.verificationLevel], true)
            .addField("Miembros", `${message.guild.members.size}`, true)
            .addField("Canales", message.guild.channels.size, true)
            .addField("Roles", message.guild.roles.size, true)
            .addField("Fecha de Creación", `${moment.utc(message.channel.guild.createdAt).format('DD/MM/YYYY')} \n(hace ${checkDays(message.channel.guild.createdAt)})`, true);

        message.channel.send({ embed });
        if (message.guild.emojis) {
            emojiEmbed.setColor('RANDOM')
            emojiEmbed.setTitle(`Emojis de ${message.guild.name}`)
            emojiEmbed.setDescription(emojiList);
            message.channel.send(emojiEmbed);
    }
    }
}

module.exports = GuildInfoCommand;