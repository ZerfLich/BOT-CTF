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
        description: "Kategori CTF",
        required: true,
        choices: [
          { name: "Cryptography", value: "cryptography" },
          { name: "Forensic", value: "forensic" },
          // Tambahkan kategori
        ],
      },
      {
        name: "challenge",
        type: 3,
        description: "Nama challenge",
        required: true,
        choices: [
          { name: "Images", value: "images" },
          { name: "Cipher", value: "cipher" },
          { name: "Sound", value: "sound" },
          { name: "Hash", value: "hash" },
          { name: "Network", value: "network" },
          // Tambahkan challenge
        ],
      },
    ],
  },
  execute: async (interaction) => {
    const category = interaction.options.getString("category");
    const challenge = interaction.options.getString("challenge");

    // Membaca file tips berdasarkan kategori dan challenge
    const tipsFilePath = `./tips/${category.toLowerCase()}/${challenge.toLowerCase()}.md`;

    fs.readFile(tipsFilePath, "utf8", (err, data) => {
      if (err) {
        interaction.reply(
          "Sorry , tips untuk kategori atau challenge ini belum tersedia."
        );
      } else {
        // Membuat pesan embed dengan tips
        const embed = {
          title: `Tips CTF: ${category} - ${challenge}`,
          description: data, // Isi tips dari file
          color: 0xd76628, // Warna Discord
        };

        // Mengirimkan pesan embed dengan tips
        interaction.reply({ embeds: [embed] });
      }
    });
  },
};
