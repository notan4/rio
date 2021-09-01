const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "invite",
    aliases: ["inv", "add"],
    category: "aibot",
    description: "\` Mời bot vào server bạn muốn\`",
    example: `${config.Prefix}invite`,

    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Thêm bot về server')
        .setDescription(`Invite me:  [Bấm vào đây](${config.Invite})`)
        .setTimestamp()

        message.channel.send(embed)
    }
}
