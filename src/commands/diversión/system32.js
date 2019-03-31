const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const colors = require('../../utils/colors');

class System32Command extends Command {
  constructor() {
    super('system32', {
      aliases: ['system32', 'sys32'],
      args: [{ id: 'user', type: 'user', default: message => message.author }],
      clientPermissions: ['EMBED_LINKS']
    })
  }

  async exec(message, args) {
    let user = args.user;
    const embed = new Discord.RichEmbed()
      .setTitle('0%')
      .setColor(colors['crimson']);

    message.channel.send({ embed }).then(msg => {

      setTimeout(() => {
        embed.setTitle('10%')
        embed.setDescription(`Eliminando los contenidos de \`${user.username.toLowerCase()}/System32/\``)
        msg.edit(embed)
      }, 2000);

      setTimeout(() => {
        embed.setTitle('20%')
        embed.setDescription(`Eliminando los contenidos de \`${user.username.toLowerCase()}/System32/\``)
        msg.edit(embed)
      }, 2000);

      setTimeout(() => {
        embed.setTitle('35%')
        embed.setDescription(`Eliminando los contenidos de \`${user.username.toLowerCase()}/System32/\``)
        msg.edit(embed)
      }, 2000);

      setTimeout(() => {
        embed.setTitle('45%')
        embed.setDescription(`Eliminando los contenidos de \`${user.username.toLowerCase()}/System32/\``)
        msg.edit(embed)
      }, 2000);

      setTimeout(() => {
        embed.setTitle('60%')
        embed.setDescription(`Eliminando los contenidos de \`${user.username.toLowerCase()}/System32/\``)
        msg.edit(embed)
      }, 2000);

      setTimeout(() => {
        embed.setTitle('78%')
        embed.setDescription(`Eliminando los contenidos de \`${user.username.toLowerCase()}/System32/\``)
        msg.edit(embed)
      }, 2000);

      setTimeout(() => {
        embed.setTitle('98%')
        embed.setDescription(`Eliminando los contenidos de \`${user.username.toLowerCase()}/System32/\``)
        msg.edit(embed)
      }, 2000);

      setTimeout(() => {
        embed.setTitle('99%')
        embed.setDescription(`Eliminando los contenidos de \`${user.username.toLowerCase()}/System32/\``)
        msg.edit(embed)
      }, 2000);

      setTimeout(() => {
        embed.setTitle('✅')
        embed.setDescription(`La carpeta \`${user.username.toLowerCase()}/System32/\` y sus contenidos fueron borrados sin errores.`)
        msg.edit(embed)
      }, 2000);

    })
  }
}

module.exports = System32Command;
