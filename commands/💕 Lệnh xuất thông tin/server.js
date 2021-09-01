const serverFlags = require('../../assets/json/serverflag.json');
const { MessageEmbed } = require('discord.js');
const { trimArray } = require('../../include/utils');
const moment = require('moment');

function checkDays(date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);
    return `${days + (days == 1 ? " day" : " days")} ago`;
}

module.exports = {
    name: 'serverinfo',
    aliases: ['guild', 'server', 'guildinfo'],
    description: '\`Đưa ra thông tin của server!\`',
    category: 'fun',
    usage: '.serverinfo',
    run: async(client, message, args) => {
        // const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        // const members = await message.guild.members.fetch();
        // const channels = message.guild.channels.cache;
        // const emojis = message.guild.emojis.cache;
        // const embed = new MessageEmbed()
        //     .setTitle(`**Thông tin server __${message.guild.name}__**`)
        //     .setColor('BLUE')
        //     .setFooter(`Server ID: ${message.guild.id}`)
        //     .setThumbnail(message.guild.iconURL({ dynamic: true }))
        //     .addField('Chung', [`**--> Tên server:** ${message.guild.name}`,
        // `**--> Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
        // `**--> Level của server:** ${message.guild.premiumTier ? `Level ${message.guild.premiumTier}` : 'None'}`,
        // `**--> Bộ lọc:** ${serverFlags.filterLevels[message.guild.explicitContentFilter]}`,
        // `**--> Mức độ xác minh:** ${serverFlags.verificationLevels[message.guild.verificationLevel]}`])
        //     .addField('Thống kê', [`**--> Số role:** ${roles.length}`,
        // `**--> Số emoji:** ${emojis.size} (${emojis.filter(e => !e.animated).size} emoji thường và ${emojis.filter(e => e.animated).size} emoji động)`,
        // `**--> Thành viên:** ${message.guild.memberCount} (${members.filter(m => !m.user.bot).size} người và ${members.filter(m => m.user.bot).size} bot)`,
        // `**--> Channel:** ${channels.filter(c => c.type === 'text').size + channels.filter(c => c.type === 'voice').size} (${channels.filter(c => c.type === 'text').size} text channel và ${channels.filter(c => c.type === 'voice').size} voice channel)`,
        // `**--> Số boost:** ${message.guild.premiumSubscriptionCount || '0'}`,
        // `**--> Ngày tạo server:** ${moment(message.guild.createdTimestamp).format('MM/DD/YYYY hh:mm:ss')}`])
        //     .addField(`Roles: `, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? trimArray(roles, 10) : 'None')
        //     .setTimestamp();
        // message.channel.send(embed);
        const verifLevels = ["None", "Low", "Medium", "High", "Highest"];
    const region = {
        brazil: "Brazil",
        "eu-central": "Central Europe",
        singapore: "Singapore",
        "us-central": "U.S. Central",
        sydney: "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        london: "London",
        amsterdam: "Amsterdam",
        hongkong: "Hong Kong"
    };

    let emojis;
    if (message.guild.emojis.cache.size === 0) {
        emojis = "None";
    } else {
        emojis = message.guild.emojis.cache.size;
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(
            message.guild.name,
            message.guild.iconURL()
                ? message.guild.iconURL()
                : client.user.displayAvatarURL()
        )
        .setThumbnail(message.guild.iconURL())
        .setDescription(
            `**Created On:** ${message.guild.createdAt
                .toString()
                .substr(0, 15)} (${checkDays(message.guild.createdAt)})\n**ID:** ${
                message.guild.id
            }\n**Owner:** ${message.guild.owner.user.username}#${
                message.guild.owner.user.discriminator
            }\n**Region:** ${region[message.guild.region]}\n**Boosts:** ${
                message.guild.premiumSubscriptionCount
            }\n**User Count:** ${message.guild.memberCount}\n**Member Count:** ${
                message.guild.members.cache.filter(m => !m.user.bot).size
            }\n**Bot Count:** ${
                message.guild.members.cache.filter(m => m.user.bot).size
            }\n**AFK Timeout:** ${
                message.guild.afkTimeout / 60
            } minutes\n**Roles:** ${message.guild.roles.cache.size}\n**Channels:** ${
                message.guild.channels.cache.size
            }\n**Emojis:** ${emojis}\n**Verification Level:** ${
                message.guild.verificationLevel
            }`
        )

        // premiumSubscriptionCount
        .setColor(Math.floor(Math.random() * 16777215));
    message.channel.send({ embed });
    },
};
