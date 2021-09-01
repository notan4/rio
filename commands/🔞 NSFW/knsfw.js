const discord = require("discord.js");
const superagent = require("superagent");
module.exports = {
    name: "knsfw",
    category: "nsfw",
    usage: ">knsfw",
    cooldown: 2,
    run: async(client, message, args) => {
        if (msg.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "4k" })
			.end((err, response, body) => {
				const emb = new discord.MessageEmbed()
					.setImage(response.body.message)
					.setColor("#00ff00")
					.setTitle("4K NSFW here")
					.setFooter(
						`Lệnh được gọi bởi ${msg.author.username}#${msg.author.discriminator}`
					);

				msg.channel.send(emb);
			});
	} else {
		msg.channel.send("??? bạn bị điên à, đây đéo phải kênh nsfw!");
	}
    },
};
