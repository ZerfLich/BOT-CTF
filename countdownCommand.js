const { CommandInteraction } = require("discord.js");
const moment = require("moment-timezone");

module.exports = {
  data: {
    name: "countdown",
    description: "Menghitung berapa lama lagi event akan dimulai",
    options: [
      {
        name: "event_time",
        type: 3,
        description:
          "Tanggal dan Waktu event (in 'dddd, D MMM. YYYY, HH:mm' format)",
        required: true,
      },
    ],
  },
  execute: async (interaction) => {
    const eventTime = interaction.options.getString("event_time");

    // Convert the provided event time to a valid datetime object
    const eventDateTime = moment(eventTime, "dddd, D MMM. YYYY, HH:mm");

    if (!eventDateTime.isValid()) {
      return interaction.reply(
        "Invalid event time format. Contoh: Friday, 10 Nov. 2023, 15:00"
      );
    }

    // Calculate the remaining time until the event
    const currentTime = moment();
    const remainingDuration = moment.duration(eventDateTime.diff(currentTime));

    const days = Math.floor(remainingDuration.asDays());
    const hours = remainingDuration.hours();
    const minutes = remainingDuration.minutes();

    // Create an embed message
    const embed = {
      title: "Countdown",
      description: "Event starts in:",
      fields: [
        {
          name: "GMT+7",
          value: `${days} days, ${hours} hours, ${minutes} minutes`,
          inline: false,
        },
      ],
      color: 0xd76628,
    };

    interaction.reply({ embeds: [embed] });
  },
};
