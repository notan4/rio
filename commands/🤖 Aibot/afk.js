
const Discord = require('discord.js'),
      db = require('quick.db');

module.exports = {
    name: "afk",
    category: "fun",
    run: async (client, message, args) => {
        const msg = args.slice(0).join(" ");
        const status = new db.table('AFKs');
          let afk = await status.fetch(message.author.id);
          if (msg=='') {
            message.channel.send('Bạn đã afk **\`Không có lý do\`**')
            status.set(`Xin lỗi, <@!${message.author.id}> đang afk. Lý do không có`)
          } else {
            message.channel.send(`Bạn đã afk **\`${msg}\`**`)
            status.set(`Xin lỗi, <@!${message.author.id}> đang afk. Lý do **${msg}**`);
          }
    }
}