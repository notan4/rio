const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "gasm",
  category: "NSFW",
  usage: "[command]",
  run: async (client, message, args) => {
  //command

  //Checks channel for nsfw
  if (message.channel.nsfw == false)
    return message.channel.send("??? bạn bị điên à, đây đéo phải kênh nsfw");

        async function work() {
        let owo = (await neko.nsfw.gasm());

        const gasm = new Discord.MessageEmbed()
        .setTitle("Gasm")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url);
        message.channel.send(gasm);

}

      work();
}
                };