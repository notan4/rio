const Discord = require('discord.js');
const cooldown = new Set();

module.exports = {
  name: "ratewaifu",
  aliases: ["rate"],
  category: "fun",
  description: "Allows you to rate a user or anyone or text",
  usage: "[command | text/user]",
run: async (client, message, args) => {
//command
// This command was originally made by RyansHDs#4461.
  // Thank you for letting me use this. -Aaron
  
  if (cooldown.has(message.author.id)) {
    let cooldownemb = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} Chậm chút bạn êy..`, message.author.displayAvatarURL)
    .setDescription(`Vui lòng thử lại sau 5s!`)
    .setColor(`RED`)
    .setFooter(`Tin nhắn sẽ tự động xóa sau 5s..`)
    return message.channel.send(cooldownemb).then(message => {
     message.delete(5000) 
    })
    
    }
    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 10000);
 let m421 = args.join(" ");
  if (!m421) return message.channel.send('nãy điền tên waifus.')
  if (m421.length > 30) return message.channel.send(`Tôi không thể đánh giá miễn phí của bạn!Waifu của bạn tên dài hơn 30 từ!`)
  let result = Math.floor((Math.random() * 100) + 0);
  
    const happyrate = new Discord.MessageEmbed()
  .setDescription(`Tôi sẽ đánh giá waifus của bạn: **${m421}** ${result}/100 ?`)
  .setColor(`GREEN`)
    
      const sadembed = new Discord.MessageEmbed()
  .setDescription(`Tôi sẽ đánh giá waifus của bạn: **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)
      
        const idkembed = new Discord.MessageEmbed()
  .setDescription(`Tôi sẽ đánh giá waifus của bạn: **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)
        
      const shrugembed = new Discord.MessageEmbed()
  .setDescription(`Tôi sẽ đánh giá waifus của bạn: **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)
                
          const okembed = new Discord.MessageEmbed()
  .setDescription(`Tôi sẽ đánh giá waifus của bạn: **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)
                        
const thumbupembed = new Discord.MessageEmbed()
  .setDescription(`Tôi sẽ đánh giá waifus của bạn: **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)

const eyesembed = new Discord.MessageEmbed()
  .setDescription(`Tôi sẽ đánh giá waifus của bạn: **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)
  
  if (result > 90) return message.channel.send(happyrate)
  if (result < 30) return message.channel.send(sadembed)
  if (result > 40) return message.channel.send(idkembed)
  if (result > 50) return message.channel.send(shrugembed)
  if (result > 60) return message.channel.send(okembed)
  if (result > 70) return message.channel.send(thumbupembed)
  if (result > 80) return message.channel.send(eyesembed)
}
};