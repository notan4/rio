const Discord = require("discord.js");
module.exports = {
    name: "createemoji",
    category: "admin",
    description: "\`Tạo emoji\`",
    usage: ">createemoji <name> <attachments>",
    cooldown: 2,
    run: async(client, message, args) => {
        const notice3 = new Discord.MessageEmbed()
		.setDescription(
			"<:cross1:747728200691482746> **Tôi không có quyền quản lý emoji!**"
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_EMOJIS"))
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	try {
		const embed6 = new Discord.MessageEmbed()
			.setDescription(
				`🚫 ${message.author.username}, Thiếu quyền`
			)
			.setColor("RED");
		if (!message.member.hasPermission("MANAGE_EMOJIS"))
			return message.channel.send(embed6).then(msg => msg.delete(5000));
		const emoji = message.attachments.array()[0] || args[0];

		if (emoji) {
			if (emoji.url) {
				if (args[0]) {
					message.guild.emojis
						.create(emoji.url, args[0])
						.then(emoji =>
							message.channel.send(`Tôi đã tạo thành công ${emoji.name} emoji!`)
						)
						.catch(err =>
							message.reply(`Tôi không thể tạo emoji!\n${err}`)
						);
				} else message.reply("Bạn cần đặt tên cho biểu tượng cảm xúc!");
			} else if (args[1]) {
				message.guild.emojis
					.create(emoji, args[1])
					.then(emoji =>
						message.channel.send(`Tôi đã tạo ra ${emoji.name} emoji!`)
					)
					.catch(err => message.reply(`Tôi không thể tạo emoji!\n${err}`));
			} else message.reply("Bạn cần đặt tên cho biểu tượng cảm xúc!");
		} else message.reply("Bạn cần cung cấp hình ảnh cho biểu tượng cảm xúc!");
	} catch (err) {
		message.channel.send(`Đã xảy ra lỗi!\n${err}`).catch();
	}
    },
};
