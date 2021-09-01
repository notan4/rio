module.exports = {
    name: 'join',
    description: "Joins The VC",
    usage: "[prefix]join",
    aliases: ['summon', 'enter'],
    run: async(client, message, args) => {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("Hãy vào room voice")

        try {
            await voiceChannel.join().then(connection => {
                connection.voice.setSelfDeaf(true)
            })
        } catch(error) {
            console.log(`Lỗi - tôi không thể tham gia kênh này : ${error}`)
            return message.channel.send(`Lỗi - tôi không thể tham gia kênh này  : ${error}`)
        }
    }
}