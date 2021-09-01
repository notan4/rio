const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "kuni",
  category: "NSFW",
  usage: "[command]",
  run: async (client, message, args) => {
  //command

  //Checks channel for nsfw
 if (message.channel.nsfw == false)
    return message.channel.send("??? bạn bị điên à, đây đéo phải kênh nsfw");

        async function work() {
        let owo = (await neko.nsfw.kuni());

        const kuni = new Discord.MessageEmbed()
        .setTitle("Kuni")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url);
        message.channel.send(kuni);

}

      work();
}
                };