
const Discord = require("discord.js");
module.exports = {
    name: "createchannel",
    category: "admin",
    description: "\`Tạo kênh voice, text\`",
    usage: ">createchannel <name> <type: text/voice>",
    cooldown: 2,
    run: async(client, message, args) => {
        const notice3 = new Discord.MessageEmbed()
		.setDescription(
			"<:cross1:747728200691482746> **Tôi không đủ quyền tạo kênh!**"
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	try {
		const embed6 = new Discord.MessageEmbed()
			.setDescription(
				`:no_entry_sign: ${message.author.username}, Missing Permission`
			)
			.setColor("RED");
		if (!message.member.hasPermission("MANAGE_CHANNELS"))
			return message.channel.send(embed6).then(msg => msg.delete(5000));
		if (!args[1]) return message.reply("Bạn cần nhập thể loại kênh đó. Ví dụ: text hoặc voice!");
		if (!args[0]) return message.reply("Bạn cần nhập tên kênh đó.!");

		message.channel.send("Tôi đã tạo kênh!").then(() => {
			message.guild.channels.create(args[1], args[0], []).catch(err => {
				message.channel.send("Đã xảy ra lỗi!");
			});
		});
	} catch (err) {
		message.channel.send(`Đã xảy ra lỗi!\n${err}`).catch();
	}
    },
};
