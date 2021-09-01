const fetch = require("node-fetch")
const discord = require("discord.js")
const parseMilliseconds = require('parse-ms');

//Nếu bạn không biết API GraphQL hoạt động như thế nào thì bạn sẽ không hiểu
var query = `
query ($search: String) { 
Media (search: $search, type: ANIME) { 
 title {
      romaji
      english
      native
    }
   coverImage {
    large
    color
  }
  nextAiringEpisode {
   timeUntilAiring
    episode
  }
  status
  episodes
  isAdult
  genres
  siteUrl
  description
  bannerImage
  }
}
`
//Thông qua truy vấn, tôi đang cố gắng chỉ nhận được thông tin cần thiết.

module.exports = {
    name: "anime",
    category: "vui",
    aliases: ["ani"],
    description: "\`Nhận thông tin anime\`",
    usage: "anime <anime_name>",
    run: async (client, message, args) => {

      if (!args.length) return message.channel.send("❌\`| Bạn cần cung cấp tên anime\`")

    let embed = new discord.MessageEmbed()
      .setAuthor("Vui lòng đợi...", client.user.displayAvatarURL())
      .setColor("YELLOW")
    let msg = await message.channel.send(embed)

    fetch("https://graphql.anilist.co", { //Ở đây tôi sẽ tìm nạp API và gửi truy vấn trong dữ liệu cùng với biến

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: { search: args.join(" ") } //in the variable object there is a search key which contains the value of the anime of which we want info
      })
    })
      .then(data => data.json())
      .then(json => {
        json = json.data.Media

        embed.setAuthor(json.title.english || json.title.romaji, json.coverImage.large)
          .setColor(json.coverImage.color || client.settings.color)
          .setDescription(Replacer(json.description).substring(0, 200) + ` [**[Read More](${json.siteUrl})**]`)
          .setImage(json.bannerImage)
          .addField("Thể loại", json.genres.join(", "))
          .addField("dành cho người lớn", json.isAdult, true)
          .addField("Trạng thái", json.status, true)
          .setFooter("Matcha Synthetic")


          if(json.nextAiringEpisode) {
            embed.addField("Tập phim", (json.nextAiringEpisode.episode - 1) + "/" + (json.episodes || " --"), true)
            let time = parseMilliseconds(json.nextAiringEpisode.timeUntilAiring * 1000)
            embed.addField("Phát sóng tiếp theo", `${time.days}d ${time.hours}h ${time.minutes}m`, true)
          }
          else embed.addField("Tổng số tập",json.episodes, true)
        return msg.edit(embed);
      })
      .catch(err => { //Simply send error message if someting went wrong
        embed.setAuthor("\`Đã xảy ra lỗi hoặc không thể tìm thấy anime này\`")
        .setColor("RED")
        return msg.edit(embed)
      });
  }

}


//Now this is the function which i created to removed some html tags from description of anime info. i replaced them with some markdown to make it look cool.
function Replacer(string) {
  return string.replace(/<br>/g, "").replace(/<i>/g, "**").replace(/<\/i>/g, "**").replace(/<i\/>/g, "**")
}
