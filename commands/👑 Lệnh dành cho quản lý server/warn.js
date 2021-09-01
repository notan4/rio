const array = require('../../assets/json/thinh.json').data;
module.exports = {
    name: "warn",
    category: "admin",
    description: "\`Cảnh cáo người dùng\`",
    usage: ">warn <mention> <reason>",
    cooldown: 2,
    run: async(client, message, args) => {
        let reason = args.slice(1).join(" ");
	//	const user = message.mentions.users.first();
	const warninguser = message.mentions.users.first();
	const user =
		warninguser ||
		(args[0]
			? args[0].length == 18
				? message.guild.members.cache.get(args[0]).user
				: false
			: false);

	const notice1 = new Discord.MessageEmbed()
		.setDescription(
			`❌ ${message.author.username}, Thiếu quyền`
		)
		.setColor("RED");

	const notice3 = new Discord.MessageEmbed()
		.setDescription(`❌ Tôi không đủ quyền cảnh báo họ!`)
		.setColor("RED");

	const notice333 = new Discord.MessageEmbed()
		.setDescription(`❌ Bạn phải đề cập đến ai đó để cảnh báo họ!`)
		.setColor("RED");
	if (
		!message.guild
			.member(client.user)
			.hasPermission(["MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS"])
	) {
		return message.channel
			.send(notice3)
			.then(m => m.delete({ timeout: 15000 }));
	}
	if (!message.member.hasPermission("KICK_MEMBERS")) {
		return message.channel
			.send(notice1)
			.then(m => m.delete({ timeout: 15000 }));
	}

	if (!user) {
		return message.channel.send(notice333).catch(console.error);
	}

	const notice2 = new Discord.MessageEmbed()
		.setDescription(`❌ Bạn không thể cảnh báo bản thân`)
		.setColor("RED");

	if (user.id === message.author.id) {
		return message.channel
			.send(notice2)
			.then(m => m.delete({ timeout: 15000 }));
	}

	if (reason.length < 1) reason = "Không có lý do.";

	const key = `${message.guild.id}-${user.id}`;

	const dsfdsfsdf = new Discord.MessageEmbed()
		.setDescription(
			`❌ Quyền truy cập bị Từ chối, thành viên đó có vai trò cao hơn hoặc bằng bạn!`
		)
		.setColor("RED");
	const sdfsdfsdfsd = new Discord.MessageEmbed()
		.setDescription(
			`❌ Quyền truy cập bị Từ chối, ** thành viên đó có vai trò cao hơn hoặc bằng tôi!`
		)
		.setColor("RED");
	const botRolePossition = message.guild.member(client.user).roles.highest
		.position;
	const rolePosition = message.guild.member(user).roles.highest.position;
	const userRolePossition = message.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return message.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition)
		return message.channel.send(sdfsdfsdfsd);

	client.moderationdb.ensure(key, {
		guildid: message.guild.id,
		userid: user.id,
		warns: 0,
		isMuted: false,
		timeMuteEnd: 0
	});
	client.moderationdb.inc(key, "warns");

	const test1 = new Discord.MessageEmbed()
		.setDescription(
			`✔️ Muted **${user.username}#${user.discriminator}** Trong 1 giờ | **Đã đạt được hai cảnh báo**`
		)
		.setColor("GREEN");
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`✔️ Warned **${user.username}#${user.discriminator}** | **${reason}**`
		)
		.setColor("GREEN");

	message.delete();
	message.channel.send(bsuembed);
	user.send(
		`Bạn được cảnh báo trong **${
			message.guild.name
		}** (Tổng cảnh báo(s): \`${client.moderationdb.get(
			key,
			"cảnh báo"
		)}\` ), **${reason}**`
	);

	const test2 = new Discord.MessageEmbed()
		.setDescription(
			`✔️ Kicked **${user.username}#${user.discriminator}** | **Đã đạt đến cảnh báo 3**`
		)
		.setColor("GREEN");

	const test3 = new Discord.MessageEmbed()
		.setDescription(
			`✔️ Banned **${user.username}#${user.discriminator}** | **Đã đạt đến 5 cảnh báo**`
		)
		.setColor("GREEN");

	if (client.moderationdb.get(key, "warns") == 2) {
		const muteRole = client.guilds.cache
			.get(message.guild.id)
			.roles.cache.find(val => val.name === "Muted");

		const mutetime = "60s";
		message.guild.members.cache.get(user.id).roles.add(muteRole.id);
		message.channel.send(test1);

		setTimeout(() => {
			message.guild.members.cache.get(user.id).roles.remove(muteRole.id);
		}, ms(mutetime));
	}

	if (client.moderationdb.get(key, "warns") == 3) {
		message.guild.member(user).kick(reason);
		message.channel.send(test2);
	}

	if (client.moderationdb.get(key, "warns") >= 5) {
		message.guild.member(user).ban(reason);
		message.channel.send(test3);
	}
    },
};
