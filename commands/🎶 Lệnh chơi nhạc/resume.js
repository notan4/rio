const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'resume',
    description: "Resume Music",
    usage: '[prefix]resume',
    aliases: ['resume', 'unpause'],
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            const resumeError = new MessageEmbed()
              .setDescription("Tham gia kênh nào bạn")
              .setColor("RED")
            return message.channel.send(resumeError)
        }
        // if(!client.distube.isPlaying(message)) {
        //     const resumeError2 = new MessageEmbed()
        //     .setDescription("There is Nothing Playing")
        //     .setColor("RED")
        //     return message.channel.send(resumeError2)
        // }
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
            .setDescription("Không có bài nào được phát")
            .setColor("RANDOM")
            return message.channel.send(queueError)
        }
        if(!client.distube.isPaused(message)) {
            const resumeError3 = new MessageEmbed()
            .setDescription('Đã dừng bài hát')
            .setColor("RANDOM")
            return message.channel.send(resumeError3)
        }

        client.distube.resume(message)
        const embed = new MessageEmbed()
        .setDescription('Đã dừng bài hát')
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}