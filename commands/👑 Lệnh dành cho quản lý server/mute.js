const { Message } = require("discord.js");
const { prefix } = require('../../config.json')
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "mute",
  aliases:[],
  usage:"mute @user",
  description : '\`mute mic của 1 thanh niên nào đó trong voice\`',
  run: async (client, message, args) => {
    const role = message.guild.roles.cache.find((r) => r.name === 'Muted')
    //--------------------------------------------------------------------------------------------------------
    if (!role) return message.channel.send(`A`)
    if (!message.member.roles.cache.has(role.id)) return message.channel.send(new MessageEmbed()
        .setDescription(`Lệnh này chỉ có thể được sử dụng bởi các thành viên có ${role}, role.`).setColor('RED')
    )
    const target = message.mentions.members.first();

    if (!target) return message.channel.send("\`người dùng không được tìm thấy\`");

    await target.voice.setMute(true);
    message.channel.send(" đã mute thành viên theo yêu cầu")
  },
};
