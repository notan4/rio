const Discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: 'nekogif',
    category: 'image',
    usage:">nekogif",
    description: "Xem gif anime neko",
    run: async (client, message, args) => {
        message.delete()
        const { body } = await superagent.get("https://nekos.life/api/v2/img/ngif");

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle("OwO, Heres your Neko Gif")
		.setImage(body.url)
		.setFooter("Matcha Tea");
	message.channel.send({ embed });
    }
}
