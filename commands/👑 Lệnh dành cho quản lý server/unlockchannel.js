const Discord = require("discord.js");
module.exports = {
    name: "unlockchannel",
    category: "admin",
    description: "\`Mở khóa kênh\`",
    usage: ">unlockchannel",
    cooldown: 2,
    run: async(client, message, args) => {
        const notice3 = new Discord.MessageEmbed()
		.setDescription(
			`❌ Tôi không có quyền quản lý kênh!`
		)
		.setColor("RED");
	const dfgrdgdfgdf = new Discord.MessageEmbed()
		.setDescription(`✔️ Đã mở khóa kênh`)
		.setColor("GREEN");

	if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const mmqembed = new Discord.MessageEmbed()
		.setDescription(
			`❌ ${message.author.username}, Thiếu quyền`
		)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(mmqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}

	if (!client.lockit) client.lockit = [];

	message.channel
		.createOverwrite(message.guild.id, {
			SEND_MESSAGES: true
		})
		.then(() => {
			message.channel.send(dfgrdgdfgdf);
			delete client.lockit[message.channel.id];
		})
		.catch(error => {
			console.log(error);
		});
    },
};
