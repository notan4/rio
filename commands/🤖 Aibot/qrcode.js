const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "qr",
    aliases: ["qrcode"],
    category: "aibot",
    description: "Coneverts the provided link to a qr code cool ?",
    usage:"!qr https://youtube.com",

    run: async (client, message, args) => {
    
        let link = (args[0])
        let qrlink = `http://api.qrserver.com/v1/create-qr-code/?data=${link}&size=200x200`

        if (!link) 
        return message.channel.send("❌\`Vui lòng cung cấp một liên kết\`")

        if (require('is-url')(link)) {
            const attachment = new Discord.MessageAttachment(qrlink, 'qrcode.png');

            const embed = new Discord.MessageEmbed()
            .setTitle('QR Code by Matcha Synthetic')
            .attachFiles(attachment)
            .setColor(message.guild.me.displayHexColor)
            .setImage('attachment://qrcode.png')
            .setFooter(`Yêu cầu bởi: ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

            message.channel.send(embed)

        } else {
            message.reply("❌\`Vui lòng đăng kèm theo 1 đường linh dẫn đến 1 trang web VD: !qrcode https:\\ + tên đằng sau của nó\`")
        }

    }
}
