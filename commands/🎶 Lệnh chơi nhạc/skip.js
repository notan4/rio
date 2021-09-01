const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'skip',
    description: "Skips Music in Queue",
    usage: "[prefix]skip",
    aliases: [],
    run: async(client, message, args)=> {
        if (!message.member.voice.channel) {
            const skipError = new MessageEmbed()
              .setDescription("Tham gia kênh nào")
              .setColor("RED")
            return message.channel.send(skipError)
        }
        if(!client.distube.isPlaying(message)) {
            const skipError2 = new MessageEmbed()
            .setDescription("Không có bài hát nào được phát")
            .setColor("RANDOM")
            return message.channel.send(skipError2)
        }

        let queue = client.distube.skip(message)

        const embed = new MessageEmbed()
        .setDescription(`Bài hát đã được skip`)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
}