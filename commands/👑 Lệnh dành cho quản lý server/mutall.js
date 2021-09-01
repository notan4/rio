
const Discord = require("discord.js");
const config = require("../../config.json")
const ms = require("ms")
module.exports = { 
	name: "muteall",
	category: "voice", 
	aliases: ["khoamom"],
	cooldown: 4,
	usage: "mute @User <thời gian (e.g: 10m)> [Lý do]",
	description: "Mutes a User for a specific Time!", 

	run: async (client, message, args, cmduser, text, prefix) => {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return message.reply(config.ERROR_MESSAGES.NO_PERMISSIONS).catch(error => console.log(error));
			
		let member = message.mentions.members.first();
		if (!member) return message.reply("ERROR, please ping a USER! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `VD: mute @User 10m test`")
		args.shift(); //shift args

		if(member.roles.highest.position>=message.member.roles.highest.position){
			return message.reply(":x: Tôi không thể mute Thành viên này, vì anh ta cao hơn/ hoặc bằng role của bạn của bạn!")
		}

		if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("Tôi cần quyền để lf việc này hãy cho tôi quyền hạn cao hơn");

		let time = args[0];
		if (!time) return message.reply("❌, vui lòng thêm THỜI GIAN! Sử dụng: `mute @User <Thời gian + VD: (e.g: 10m)> [Lý do]` ví dụ: `mute @User 10m abczyx`")
		args.shift();

		let reason = args.join(" ");

		let allguildroles = message.guild.roles.cache.array();
		
		let mutedrole = false;
		for (let i = 0; i < allguildroles.length; i++) {
			if (allguildroles[i].name.toLowerCase().includes("Muteall")) {
				mutedrole = allguildroles[i];
				break;
			}
		}
		if (!mutedrole) {
			if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply("Tôi cần sự cho phép để Quản lý role hay còn gọi là cung cấp role");
			let highestrolepos = message.guild.me.roles.highest.position;
			console.log(Number(highestrolepos)-1)
			mutedrole = await message.guild.roles.create({
					data: {
						name: 'Muteall',
						color: '#222222', 
						hoist: false, 
						position: Number(highestrolepos) - 1, 
					  
					},
					reason: 'Role này đã được tạo, mute tiếng Member!',
				})
				.catch(e => {
					console.log(e);
					message.reply("TÔI KHÔNG THỂ TẠO ROLE, xin lỗi")
				});
		}
		if(mutedrole.position > message.guild.me.roles.highest.position){
			return message.reply(":x: Tôi không thể truy cập role, vì nó ở trên tôi!")
		}
		let mutetime;
		try{
		mutetime = ms(time);
		}catch{
			return message.reply("LỖI, vui lòng thêm THỜI GIAN! Sử dụng: `mute @User < Thời gian+Format(e.g: 10m)> [lý do]` ví dụ: `mute @User 10m abcxyz`")
		}	
		if(!mutetime || mutetime === undefined) return message.reply("ERROR, please add a TIME! Usage: `LỖI, vui lòng thêm THỜI GIAN! Cách sử dụng: `mute @User <Time + Format (ví dụ: 10m)> [LÝ DO]` ví dụ: `mute @User 10m ABCXYZ!`")
		
		await message.guild.channels.cache.forEach(ch => {
			try{
				ch.updateOverwrite(mutedrole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false, SPEAK: false });
			}catch (e) {console.log(e)}
		})

		try{
			member.roles.add(mutedrole);
		}catch{
			message.channel.send("Đã xảy ra sự cố!")
		}
		let embed = new Discord.MessageEmbed()
		.setColor(config.colors.yes)
		.setTitle(`Muted: \`${member.user.tag}\``)
		.setThumbnail(member.user.displayAvatarURL({dynamic:true}))
		.setFooter(`By: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
		.setDescription(`He is now muted for \`${ms(mutetime, { long: true })}\`${reason ? `\n\n**REASON**\n> ${reason.substr(0 , 1800)}`: "\nNO REASON"}`)
		message.channel.send(embed).catch(e=>console.log(e))
		
		member.send(embed.setTitle(`You got muted by: \`${message.author.tag}\``)).catch(e=>console.log(e))
		
		setTimeout(()=>{
			try{
				message.channel.send(embed.setTitle(`You got unmuted: \`${member.user.tag}\``).setDescription("\u200b")).catch(e=>console.log(e))
				member.roles.remove(mutedrole);
			}catch{
				message.channel.send("Something went wrong!")
			}
		}, mutetime)
	}
}
