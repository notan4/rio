const Discord = require("discord.js");
const superagent = require("superagent");
module.exports = {
    name: "wallpaper",
    category: "nsfw",
    usage: ">wallpaper",
    cooldown: 2,
    run: async(client, message, args) => {
        if (message.channel.nsfw == false)
		return message.channel.send("??? bạn bị điên à, đây đéo phải kênh nsfw");
	const { body } = await superagent.get(
		"https://nekos.life/api/v2/img/wallpaper"
	);

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle("Wallpaper Here")
		.setImage(body.url);
	message.channel.send({ embed });
    },
};
