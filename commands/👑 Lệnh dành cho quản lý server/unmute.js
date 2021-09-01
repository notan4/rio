const { prefix } = require('../../config.json')

const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'unmute',
    aliases:["umnutevoice"],
    description: '\`Được sử dụng để mở míc cho thanh niên nào đấy\`',
    run: async (client, message, args) => {
        const role = message.guild.roles.cache.find((r) => r.name === 'Muted')
        //--------------------------------------------------------------------------------------------------------
        if (!role) return message.channel.send(`.`)
        if (!message.member.roles.cache.has(role.id)) return message.channel.send(new MessageEmbed()
            .setDescription(`Lệnh này chỉ sử dụng được những thanh niên có: ${role}, role.`).setColor('RED')
        )
        let channel = message.member.voice.channel;
        for (let member of channel.members.filter((member) => !member.user.bot)) {
            await member[1].voice.setDeaf(false).then(member[1].voice.setMute(false));
        }
        message.channel.send('\`đã mở mute cho thanh niên\`')
    }
}
