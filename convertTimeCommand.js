const { CommandInteraction } = require("discord.js");

module.exports = {
  data: {
    name: "converttime",
    description: "Convert time to a different time zone",
    options: [
      {
        name: "time",
        type: "STRING",
        description: "The time to convert",
        required: true,
      },
      {
        name: "timezone",
        type: "STRING",
        description: "The target time zone",
        required: true,
      },
    ],
  },
  execute: async (interaction) => {
    const time = interaction.options.getString("time");
    const timezone = interaction.options.getString("timezone");

    // Logic to convert time to the specified time zone

    // Respond to the interaction with the converted time
    interaction.reply(`Converted time in ${timezone}: ${convertedTime}`);
  },
};
