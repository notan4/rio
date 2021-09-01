const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    description: "Sends queue list",
    usage: "[prefix]queue",
    aliases: ['q', 'list'],
    run: async(client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
            .setDescription("Không có bài nào được phát")
            .setColor("RANDOM")
            return message.channel.send(queueError)
        }
        let q = queue.songs.map((song, i) => {
            return `${i === 0 ? "Bài hát đang phát:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n");

        const embed = new MessageEmbed()
        .setDescription(`**Danh sách: ** \n\n  ${q}`)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
}