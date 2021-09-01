module.exports = {
    name: 'leave',
    description: "Leaves The VC",
    aliases: ['dc', 'disconnect', 'exit'],
    run: async(client, message, args) => {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("bạn không cùng kênh với tôi")

        try {
            voiceChannel.leave()
        } catch(error) {
            return message.channel.send(`Tôi không thể tham gia kênh : ${error}`)
        }
    }
}