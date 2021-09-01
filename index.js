console.clear()
console.log("[INFO]: Matcha Synthetic...")
const { Client, Collection } = require('discord.js');
const db = require('quick.db')
const config = require("./config.json");
const yaml = require("js-yaml");
require('dotenv').config()
Discord = require("discord.js");
const decache = require('decache');
const Distube = require("distube");
const path = require("path");
const { token } = require('./config.json');
const { default_prefix } = require('./config.json');
const { readdirSync } = require('fs');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { CHANNELID } = require('./config.json');
const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".mp4", ".webm", ".mov"];
const client = new Client({
    disableMentions: 'everyone'
});
const moment = require("moment")
const guildInvites = new Map();
const ms = require('ms');
const setups = require("./handlers/setups");
setups(client);

client.on('inviteCreate', async inivte => {
    const channel = inivte.guild.channels.cache.get('838466405577392140');
    if (channel) {
        const embed = new MessageEmbed()
            .setTitle(`Có link invite mới được tạo!`)
            .addField('Người tạo', inivte.inviter.tag)
            .setFooter(`ID: ${inivte.inviter.id}`)
            .addField('Số lượng: ', inivte.maxUses == 0 ? "Không giới hạn" : inivte.maxUses)
            .addField('Thời hạn của link: ', inivte.maxAge == 0 ? "Không giới hạn" : ms(inivte.maxAge, { long: true }))
            .setTimestamp()
        channel.send(embed)
    }
    guildInvites.set(inivte.guild.id, await inivte.guild.fetchInvites())
});

const welcome = require("./welcome");
welcome(client);
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();
client.categoryes = readdirSync(`./commands/`);

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on('guildMemberAdd', async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const channel = member.guild.channels.cache.get('838466405577392140');
        if (channel) {
            const embed = new MessageEmbed()
                .setDescription(`${member} (${member.user.tag}) đã vào server!\nMời bởi \`${usedInvite ? usedInvite.inviter.tag : "Không xác định được"}\``)
                .setFooter(`ID người vào: ${member.id}`)
                .setTimestamp()
            channel.send(embed)
        }
    }
    catch(err) {
        console.log(err);
    }
})

client.on('message', async message => {
    const prefix = '&';
    if (message.author.bot) return;
    let choosePrefix = null;
    const prefixList = [`<@${client.user.id}>`, `<@!${client.user.id}>`, prefix];
    for (const thisprefix of prefixList) {
        if (message.content.toLowerCase().startsWith(thisprefix)) choosePrefix = thisprefix
    }
    if (prefix === null) return;
    if (!message.content.startsWith(choosePrefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    switch(cmd) {
        case 'invite': {
            if (!args[0]) return message.channel.send('VD: `&invite 3n 5m`\n3n = 3 người, 5m = 5 phút');
            let songuoi = args[0];
            if (!songuoi.endsWith('n')) return message.channel.send('Nhập số người invite (0n để không giới hạn)');
            songuoi = parseInt(args[0].replace('n', ''));
            let thoigian = args[1];
            if (thoigian !== 0) thoigian = ms(thoigian);
            if (!thoigian) return message.channel.send('Thời gian không hợp lệ!');
            let sanhchung = message.guild.channels.cache.get('838466405577392140');
            if (!sanhchung) return message.channel.send('Không tìm thấy channel sảnh chung!');
            let inv = await sanhchung.createInvite({ maxAge: thoigian, maxUses: songuoi });
            message.author.send(`Link invite của bạn: ${inv.url}`);
        }
    }
})
// Invite
client.on("message", async message => {
   
    if (message.author.bot) return;
    if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        command.run(client, message, args); // thêm "db" nếu về sau sử dụng mà có lỗi thì xoá db và welcome 
});

// Confession 
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'dm') return;
    if (message.content.length > 1024) return message.channel.send('tin nhắn chỉ được dưới 1024 ký tự!');
    else {
        await message.react("🙂");
        message.channel.send('\`đã gửi confession thành công\`');
        let count = JSON.parse(fs.readFileSync('./assets/json/count.json')).count;
        count++;
        const cfschannel = client.channels.cache.get(CHANNELID);
        if (!cfschannel) return;
        const embed = new MessageEmbed()
            .setTitle(`**Confession: #${count}**`)
            .setDescription(`${message.content}`)
            .setColor("RANDOM") //
            .setTimestamp() //
            if (message.attachments.array().length > 0) {
                let attachment = message.attachments.array()[0];
        picExt.forEach(ext => {
            if (attachment.name.endsWith(ext)) embed.setImage(attachment.attachment);
        });
        videoExt.forEach(ext => {
            if (attachment.name.endsWith(ext)) cfschannel.send(attachment);
        });
        }
        cfschannel.send(embed);
        fs.writeFileSync('./assets/json/count.json', JSON.stringify({ count: count }));
    }
});
client.distube = new Distube(client, {
  searchSongs: false,
  leaveOnFinish: false,
  leaveOnStop: false,
});
   
const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"
  }\` | Loop: \`${queue.repeatMode
    ? queue.repeatMode == 2
      ? "All Queue"
      : "This Song"
    : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube
  .on("playSong", (message, queue, song) => {
    const playSongEmbed = new Discord.MessageEmbed()
      .setTitle('Bắt đầu hát')
      .setDescription(`[${song.name}](${song.url})`)
      .addField('**Số lượng views:**', song.views)
      .addField('**Thời gian:**', song.formattedDuration)
      .addField('**Trạng thái**', status(queue))
      .setThumbnail(song.thumbnail)
      .setColor("RANDOM")
    message.channel.send(playSongEmbed)
  })
  .on("addSong", (message, queue, song) =>
    message.channel.send(
      `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
  )
  .on("playList", (message, queue, playlist, song) =>
    message.channel.send(
      `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items
      } songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration
      }\`\n${status(queue)}`
    )
  )
  .on("addList", (message, queue, playlist) =>
    message.channel.send(
      `${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items
      } songs) to queue\n${status(queue)}`
    )
  )
  .on("error", (message, err) =>
    message.channel.send(
      `Đã xảy ra lỗi. Có thể Embed size exceeds maximum size of 6000`
    )
  );
  client.on('guildCreate', guild =>{

    const channelId = '882239167935946832'; //put your channel ID here

    const channel = client.channels.cache.get(channelId); 
     
    if(!channel) return; //If the channel is invalid it returns
    const embed = new discord.MessageEmbed()
        .setTitle('I Joined A Guild!')
        .setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
    channel.send(embed);
});


client.on('guildDelete', guild =>{
    const channelId = '882239142803681310';//add your channel ID
    const channel = client.channels.cache.get(channelId); //This Gets That Channel
    
    if(!channel) return;  //If the channel is invalid it returns
    const embed = new discord.MessageEmbed()
        .setTitle('I Left A Guild!')
        .setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RED')
        .setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
    channel.send(embed);
});
client.login(token);
