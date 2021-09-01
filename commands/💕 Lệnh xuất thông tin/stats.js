const Discord = require('discord.js');
const config = require('../../config.json');
const fs = require("fs");
const fetch = require("node-fetch");

module.exports = {
    name: "stats",
    aliases: ["up", "ut"],
    category: "Info",
    description: "⏱️\`Hiển thị thời gian online của bot\`",
    example: `${config.Prefix}uptime`,

    run: async (client, message, args) => {
        const milliseconds = parseInt((client.uptime % 1000) / 100);
    let seconds = parseInt((client.uptime / 1000) % 60);
    let minutes = parseInt((client.uptime / (1000 * 60)) % 60);
    let hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
    let days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
    days = days < 10 ? `0${days}` : days;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    // var totcmds = files.length;

    fetch(
        "https://api.hetrixtools.com/v1/f10ac71364c8b1aa149b4079fe8eafc9/uptime/report/483cfd9cb2dd306bf8c00917da1df827/"
    )
        .then(response => response.json())
        .then(data => {
            const numberas = data.Uptime_Stats.Total.Uptime.toLocaleString();

            const embed = new Discord.MessageEmbed()
                .setColor(0x7289da)
                .setTimestamp()
                // .addField("Prefix", 'd!', true)
                // .addField("Total Commands", `${totcmds} commands`, true)
                .addField("Total Servers", `${client.guilds.cache.size}`, true)
                .addField("Uptime Percentage", `${numberas}%`)
                .addField("Ping", `${Math.round(client.ws.ping)}ms`, true)
                .addField(
                    "Uptime",
                    `${days}d ${hours}h ${minutes}m ${seconds}.${milliseconds}s`,
                    true
                )
                .setFooter(
                    "RIO",
                    "https://cdn.discordapp.com/attachments/870324143441186826/878240716898316348/circle.png"
                );
            return message.channel.send({ embed });
    });
}};
