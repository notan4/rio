const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "warnings",
    category: "admin",
    description: "\`Xin thính để đi tán gái\`",
    usage: ">warnings <mention>",
    cooldown: 2,
    run: async(client, message, args) => {
        const emddd = new Discord.MessageEmbed()
		.setDescription(
			`❌ Bạn phải đề cập đến một người nào đó để kiểm tra cảnh báo của họ.`
		)
		.setColor("RED");
	// const user = message.mentions.users.first();

	const warninguser = message.mentions.users.first();
	const user =
		warninguser ||
		(args[0]
			? args[0].length == 18
				? message.guild.members.cache.get(args[0]).user
				: message.author
			: message.author);
	// client.moderationdb
	if (!user) return message.channel.send(emddd);
	const key = `${message.guild.id}-${user.id}`;

	client.moderationdb.ensure(key, {
		guildid: message.guild.id,
		userid: user.id,
		warns: 0,
		isMuted: false,
		timeMuteEnd: 0
	});
	// if (!warns[user.id]) return message.channel.send(emddd)

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTimestamp()
		.setTitle(`Cảnh báo về ${user.username}#${user.discriminator}`)
		.setDescription(
			`Số lượng cảnh báo: ${client.moderationdb.get(key, "warns")}`
		);
	message.channel.send({ embed });
    },
};
