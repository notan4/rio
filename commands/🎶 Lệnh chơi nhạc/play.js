const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    description: "Play Songs",
    usage: "[prefix]play <Song Name / URL>",
    aliases: ["p"],
    run: async (client, message, args) => {
      if (!message.member.voice.channel) {
        const playError = new MessageEmbed()
          .setDescription("Vui lòng vào room voice")
          .setColor("RANDOM")
        return message.channel.send(playError)
      }
      const voiceChannel = message.member.voice.channel
      const permissions = voiceChannel.permissionsFor(message.client.user)
      if (!permissions.has("SPEAK")) {
        const playError2 = new MessageEmbed()
          .setDescription("Tôi không có quyền nói trong room voice này")
          .setColor("RANDOM")
        return message.channel.send(playError2)
      }
      if (!permissions.has("CONNECT")) {
        const playError3 = new MessageEmbed()
          .setDescription("Tôi không có quyền kết nối room voice này hãy cấp vai trò kết nối cao hơn")
          .setColor("RANDOM")
        return message.channel.send(playError3)
      }

      let songName = args.slice(0).join(" ")
      if (!songName) {
        const playError2 = new MessageEmbed()
          .setDescription("Vui lòng nhập tên vài hoặc url youtube")
          .setColor("RED")
        return message.channel.send(playError2)
      }

      try {
        voiceChannel.join().then(connection => {
          connection.voice.setSelfDeaf(true)
        })
        client.distube.play(message, songName)
      } catch (err) {
        message.channel.send(`Ơ đã có lỗi xảy ra - Không thể bật nhạc này! \n Lỗi nhạc: ||${err}||`)
      }
  },
};
