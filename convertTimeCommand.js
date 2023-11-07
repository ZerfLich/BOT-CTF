const { CommandInteraction } = require("discord.js");
const moment = require("moment-timezone");

module.exports = {
  data: {
    name: "converttime",
    description: "Convert time to GMT+7 time zone",
    options: [
      {
        name: "time",
        type: 3,
        description: "The time to convert (in UTC format)",
        required: true,
      },
    ],
  },
  execute: async (interaction) => {
    const time = interaction.options.getString("time");
    const targetTimezone = "Etc/GMT+7"; // Set zona waktu target ke GMT+7

    // Konversi waktu ke zona waktu target (GMT+7)
    const convertedTime = moment(time, "ddd, DD MMM. YYYY, HH:mm [UTC]")
      .tz(targetTimezone)
      .format("dddd, DD MMM. YYYY, HH:mm");

    // Buat pesan embed menggunakan objek JavaScript
    const embed = {
      title: "Waktu Event",
      description: "Event CTF akan dimulai Pada: ",
      fields: [{ name: "GMT+7", value: convertedTime }],
      color: 0xd76628,
    };

    // Respond to the interaction with the embed
    interaction.reply({ embeds: [embed] });
  },
};
