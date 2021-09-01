const db = require("quick.db");

module.exports = {
    name: "setmuterole",
    category: "moderation",
    aliases: ["setmute", "smrole", "smr"],
    description: "Đặt vai trò tắt tiếng cho người dùng bị tắt tiếng!",
    usage: "[role name | role mention | role ID]",
    accessableby: "Administrators"
  ,
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**Bạn không đủ quyền thực hiện hành động này! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Muterole đặt trong máy chủ này là \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Vui lòng nhập tên vai trò hoặc ID để đặt!**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Vui lòng nhập tên hoặc ID vai trò hợp lệ!**");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**Vai trò này đã được đặt làm người tắt tiếng!**"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `**\`${role.name}\` Đã được đặt thành công làm Muterole!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Lỗi - `Thiếu quyền hoặc vai trò không tồn tại!`**",
        `\n${e.message}`
      );
    }
  }
};
