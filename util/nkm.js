const { MessageEmbed } = require("discord.js");
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
 async canModifyQueue(member) {
    //define the EMBED
    let resultsEmbed = new MessageEmbed()
      .setTitle("❗️ | Bạn phải ở trong cùng một kênh tiếng nói với tôi!")
      .setColor("#ff0e7a")
    //wenn memberchannel nicht der botchannel ist
    if (member.voice.channel !== member.guild.me.voice.channel) {
    //Send the message to the MEMBER
      member.send(resultsEmbed);
      //return false that it ends the command
      return false;
    }
    //return true that it continues the command
    return true;
  }
};