const { MessageEmbed, MessageManager } = require("discord.js")

module.exports = {
    name: 'pause',
    description: "Pause Music",
    usage: "[prefix]pause",
    aliases: [],
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            const pauseError = new MessageEmbed()
              .setDescription("Bạn vào kênh voice đi")
              .setColor("RANDOM")
            return message.channel.send(pauseError)
        }
        if(!client.distube.isPlaying(message)) {
            const pauseError2 = new MessageEmbed()
            .setDescription("Không có bài hát nào được phát")
            .setColor("RANDOM")
            return message.channel.send(pauseError2)
        }
        if(client.distube.isPaused(message)) {
            const pauseError3 = new MessageEmbed()
            .setDescription('Bài hát đã bị tạm dừng')
            .setColor("RANDOM")
            return message.channel.send(pauseError3)
        }

        client.distube.pause(message)
        const embed = new MessageEmbed()
        .setDescription('Bài hát đã bị tạm dừng')
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}