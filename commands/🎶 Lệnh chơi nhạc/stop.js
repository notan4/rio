const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'stop',
    description: "Stops the Music and clears queue",
    usage: "[prefix]stop",
    aliases: ['s'],
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            const stopError = new MessageEmbed()
              .setDescription("Hãy tham gia kênh thoại")
              .setColor("RANDOM")
            return message.channel.send(stopError)
        }
        if(!client.distube.isPlaying(message)) {
            const stopError2 = new MessageEmbed()
            .setDescription("Không có bài nào được phát")
            .setColor("RANDOM")
            return message.channel.send(stopError2)
        }
        client.distube.stop(message);
        const embed = new MessageEmbed()
        .setDescription('Bài hát đã được xóa')
        .setColor("RANDOM")
        message.channel.send(embed)

    }
}