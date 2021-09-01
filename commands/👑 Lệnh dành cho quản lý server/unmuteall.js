const Discord = require("discord.js");
const config = require("../../config.json")
const ms = require("ms")
module.exports = {
	//definition
	name: "unmuteall",
	category: "",
	aliases: [""],
	cooldown: 4,
	usage: "unmute @User", 
	description: "Unmutes a User!", 

	//running the command with the parameters: client, message, args, user, text, prefix
	run: async (client, message, args, cmduser, text, prefix) => {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return message.reply(config.ERROR_MESSAGES.NO_PERMISSIONS).catch(error => console.log(error));


		let member = message.mentions.members.first();
		if (!member) return message.reply("ERROR`")
		args.shift(); //shift args

		if(member.roles.highest.position>=message.member.roles.highest.position){
			return message.reply(":x:")
		}

		if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("Is");


		let allguildroles = message.guild.roles.cache.array();
		
		let mutedrole = false;
		for (let i = 0; i < allguildroles.length; i++) {
			if (allguildroles[i].name.toLowerCase().includes("Muteall")) {
				mutedrole = allguildroles[i];
				break;
			}
		}
		if (!mutedrole) {
			return message.reply(":x:")
		}
		if(!message.member.hasPermission("ADMINISTRATOR") && mutedrole.position > message.guild.me.roles.highest.position){
			return message.reply(":x:!")
		}
		try{
			member.roles.remove(mutedrole);
		}catch{
			message.channel.send("ng!")
		}
		let embed = new Discord.MessageEmbed()
		.setColor(config.colors.yes)
		.setTitle(`mở mute: \`${member.user.tag}\``)
		.setThumbnail(member.tag.displayAvatarURL({dynamic:true}))
		.setFooter(`Matcha Synthetic: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
		message.channel.send(embed)
		try{
			member.send(embed.setTitle(`y: \`${message.author.tag}\``))
		}catch{
		}		
	}
}
