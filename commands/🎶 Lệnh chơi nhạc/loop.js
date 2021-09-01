const { MessageEmbed } = require("discord.js");
const isPlaying = require("distube");
module.exports = {
    name: 'loop',
    description: "Loops / Repeat the Music",
    usage: "[prefix]loop",
    aliases: ['loops'],
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            const loopError = new MessageEmbed()
              .setDescription("Tham gia kênh nào bạn êy")
              .setColor("RANDOM")
            return message.channel.send(loopError)
        }
        if(!client.distube.isPlaying(message)) {
            const loopError2 = new MessageEmbed()
            .setDescription("Không có bài hát để phát")
            .setColor("RANDOM")
            return message.channel.send(loopError2)
        }

        let mode = null

        switch (args[0]) {
            case "off":
              mode = 0
              break
            case "song":
              mode = 1
              break
            case "queue":
              mode = 2
              break
          }


        mode = client.distube.setRepeatMode(message, mode) 
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        const embed = new MessageEmbed()
        .setDescription(`Lặp lại đã được : \`${mode}\` \n Sử dụng lệnh giống nhau liên tục sẽ làm thay đổi trạng thái vòng lặp.`)
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}