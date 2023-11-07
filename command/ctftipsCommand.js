const { CommandInteraction } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: {
    name: "ctftips",
    description: "Tips untuk CTF",
    options: [
      {
        name: "category",
        type: 3,
        description: "Kategori CTF, contoh: stenography",
        required: true,
      },
    ],
  },
  execute: async (interaction) => {
    const category = interaction.options.getString("category");

    // Membaca file tips berdasarkan kategori
    const tipsFilePath = `./tips/${category.toLowerCase()}.md`;

    fs.readFile(tipsFilePath, "utf8", (err, data) => {
      if (err) {
        interaction.reply("Maaf, tips untuk kategori ini belum tersedia.");
      } else {
        // Membuat pesan embed dengan tips
        const embed = {
          title: `Tips CTF: ${category}`,
          description: data, // Isi tips dari file
          color: 0xd76628, // Warna Discord
        };

        // Mengirimkan pesan embed dengan tips
        interaction.reply({ embeds: [embed] });
      }
    });
  },
};
