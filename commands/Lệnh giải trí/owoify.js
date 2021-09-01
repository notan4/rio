const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
name: "sendmess",
category: "fun",
run: async (client, message, args) => {
//command
async function work() {

  let coolusertext = args.join(" ");
    if (!coolusertext) return message.channel.send('Vui lòng nhập chữ.')
    if (coolusertext.length > 200) return message.channel.send(`Tôi không thể nợ văn bản của bạn, nó dài hơn 200 ký tự!`)
  
          let owo = await neko.sfw.OwOify({text: coolusertext});
          message.channel.send(owo.owo).catch(error => {
              console.error(error);
          });
  
        }
  
        work();
}
};