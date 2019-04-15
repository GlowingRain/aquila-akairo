const Discord = require('discord.js');
const hexColorRegex = require('hex-color-regex');
const colors = require('./colors');

module.exports.randomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

module.exports.randomObject = (obj) => {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};

module.exports.deleteMessageAfterSent = (message, content, interval) => {
    // String to integer (string => number)
    let ms = parseInt(interval);
    // Must always be a string
    if (typeof content !== 'string') return console.error;
    // If interval was not put, set a default one
    if (!ms) interval = 5000;

    return message.channel.send(content).then(msg => msg.delete(interval));
};

module.exports.embedMessage = (message, content, hex) => {
    let regex = hexColorRegex().test(hex);
    let embed = new Discord.RichEmbed()
        .setDescription(`${content}`);

    if (regex === true) {
        embed.setColor(hex)
    } else {
        embed.setColor(0x36393E);
    }

    return message.channel.send({ embed });
};

module.exports.grabEmoji = (client, emoji) => {
    let grabbed = client.emojis.get(emoji)
    return grabbed;
};