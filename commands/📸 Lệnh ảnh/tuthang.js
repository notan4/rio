const Discord = require('discord.js');
const config = require('../../config.json');
const DIG = require("discord-image-generation");

module.exports = {
    name: "tuthang",
    aliases: ["notstonk"],
    category: "Image",
    description: "\`meme về nên kinh tế giảm sút\`",
    example: `${config.Prefix}stonk @Dinav`,

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if(!user)
        return message.reply("❌\`Vui lòng tag người hợp lệ\`")

        const avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });

        let img = await new DIG.NotStonk().getImage(avatar);

        let attach = new Discord.MessageAttachment(img, "nostonk.png");

        message.channel.send(attach)
    }
}
