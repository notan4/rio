
const Discord = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
    name: "changemymind",
    category: "image",
    description: "\`Thêm chữ vào ảnh\`",
    usage: "<PREFIX>changemymind [text]",
    run: async (client, message, args) => {
        const notice3 = new Discord.MessageEmbed()
		.setDescription(
			"<:cross1:747728200691482746> **Vui lòng nhập văn bản bạn muốn thêm!**"
		)
		.setColor("RED");
	const mindtxt = args.slice(0).join(" ");
	if (!mindtxt) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 10000 }));
	}

	const image = await canvacord.Canvas.changemymind(mindtxt);

	const triggered = new Discord.MessageAttachment(image, "changemymind.png");

	message.channel.send(triggered);
    },
};
