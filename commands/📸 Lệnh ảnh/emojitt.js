const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');
const num = {
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
};

module.exports = {
    name: "emojify",
    aliases: ["efy"],
    description: "\`Biến đổi chữ thành emoji\`",
    usage: ".emojify hello",
    category: "aibot",

    run: async (client, message, args) => {

        if(!args[0]) return message.reply("💬\`Cung cấp văn bản để biểu tượng cảm xúc\`")

        let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);

        msg = msg.split('').map(c => {
            if (c === ' ') return c;
            else if (/[0-9]/.test(c)) return num[c];
            else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
        }).join('');

        if(!msg) return message.reply(`Không thể biểu tượng hóa cảm xúc **${args[0]}**`)

        if (msg.length > 2048) {
            msg = msg.slice(0, msg.length - (msg.length - 2033)); 
            msg = msg.slice(0, msg.lastIndexOf(':')) + '**bruh**';
        }

        message.channel.send(msg)

    }
}
