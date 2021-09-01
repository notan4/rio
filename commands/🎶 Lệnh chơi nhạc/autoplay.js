const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'autoplay',
    description: "Toggles Autoplay to ON / OFF",
    usage: "[prefix]autoplay",
    aliases: ['autop'],
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            const autoplayError = new MessageEmbed()
              .setDescription("Vui lòng vào room voice")
              .setColor("RANDOM")
            return message.channel.send(autoplayError)
        }
        if(!client.distube.isPlaying(message)) {
            const autoplayError2 = new MessageEmbed()
            .setDescription("Không có bài hát nào được phát")
            .setColor("RANDOM")
            return message.channel.send(autoplayError2)
        }

        let mode = client.distube.toggleAutoplay(message)
        const embed = new MessageEmbed()
        .setDescription(`Autoplay đang ở trạng thái :\`` + (mode ? "On" : "Off") + "\`")
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}