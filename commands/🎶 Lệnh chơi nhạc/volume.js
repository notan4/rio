const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'volume',
    description: "Changes Volume",
    usage: "[prefix]volume [number from 1 - 100]",
    aliases: ['vol','v'],
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            const volumeError = new MessageEmbed()
              .setDescription("Tham gia kênh bạn êy")
              .setColor("RANDOM")
            return message.channel.send(volumeError)
        }
        if(!client.distube.isPlaying(message)) {
            const volumeError2 = new MessageEmbed()
            .setDescription("Không có bài nào được phát")
            .setColor("RANDOM")
            return message.channel.send(volumeError2)
        }
        let volume = parseInt(args[0])
        if(isNaN(args[0])) {
            const volumeError3 = new MessageEmbed()
            .setDescription('Nhập âm lượng thích hợp từ 1 - 200')
            .setColor("RANDOM")
            return message.channel.send(volumeError3)
        }
        if(args[0] > 200) {
            const volumeError4 = new MessageEmbed()
            .setDescription('Nhập âm lượng thích hợp từ 1 - 200')
            .setColor("RANDOM")
            return message.channel.send(volumeError4)
        }

        client.distube.setVolume(message, volume)
        const embed = new MessageEmbed()
        .setDescription(`Âm lượng đã được thay đổi \`${volume}%\``)
        .setColor("RANDOM")
        message.channel.send(embed)

    }
}