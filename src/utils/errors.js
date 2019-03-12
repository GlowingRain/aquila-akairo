const { RichEmbed } = require('discord.js');
const colors = require('./colors');

module.exports.errorMessage = (error, message) => {
    const errorMsg = new RichEmbed()
        .setColor(colors['red'])
        .setDescription(`❌ | ${error}`);

    return message.channel.send(errorMsg);
};

module.exports.warnMessage = (warning, message) => {
    const warnMsg = new RichEmbed()
        .setColor(colors['orange'])
        .setDescription(`⚠ | ${warning}`);

    return message.channel.send(warnMsg);
};