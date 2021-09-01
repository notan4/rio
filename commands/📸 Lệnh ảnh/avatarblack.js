const Discord = require('discord.js');
const config = require('../../config.json');
const DIG = require("discord-image-generation");

module.exports = {
    name: "avtbl",
    category: "vui",
    aliases: ["gs"],
    description: "\`Làm bay màu avatar trở về dạng đem trắng\`",
    usa: "!avtbl @tag người cần xem",

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if(!user)
        return message.reply("❌\`Tag người có thật đi đừng tag clone nữa\`")

        const avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });

        let img = await new DIG.Greyscale().getImage(avatar);

        let attach = new Discord.MessageAttachment(img, "greyscale.png");

        message.channel.send(attach)
    }
}
