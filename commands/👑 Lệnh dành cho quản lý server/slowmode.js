const Discord = require("discord.js");
module.exports = {
    name: "slowmode",
    category: "admin",
    description: "\`Làm chậm nhắn tin mọi người trong kênh\`",
    usage: ">slowmode <thời gian>(tối đa 21600 giây)",
    cooldown: 2,
    run: async(client, message, args) => {
        const notice3 = new Discord.MessageEmbed()
		.setDescription(
			`❌ Không đặt được chế độ làm chậm trong kênh này, hãy kiểm tra số chế độ chậm của bạn!`
		)
		.setColor("RED");

	const notice1 = new Discord.MessageEmbed()
		.setDescription(
			`❌ Không đặt được chế độ làm chậm trong kênh này, vui lòng nhập một số hợp lệ!`
		)
		.setColor("RED");

	const noticwsse1 = new Discord.MessageEmbed()
		.setDescription(
			`❌ Không đặt được chế độ làm chậm trong kênh này, bạn chỉ có thể nhập trong 0 - 21600 giây!`
		)
		.setColor("RED");

	const notice22 = new Discord.MessageEmbed()
		.setDescription(
			`❌ Tôi không có quyền thay đổi chế độ làm chậm kênh!`
		)
		.setColor("RED");

	if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const duration = parseInt(args[0]);
	const mmsssqembed = new Discord.MessageEmbed()
		.setDescription(
			`❌ ${message.author.username}, Thiếu quyền`
		)
		.setColor("#FFFF00");
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(mmsssqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	if (isNaN(duration)) {
		return message.channel.send(notice1);
	}
	if (duration < 0 || duration > 21601) {
		return message.channel.send(noticwsse1);
	}
	message.channel.setRateLimitPerUser(duration).catch(() => {
		message.channel.send(notice3);
	});
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`✔️ Đặt chế độ làm chậm của kênh thành **${duration}s** `
		)
		.setColor("GREEN");

	message.channel.send(bsuembed);
    },
};
