const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const convertTimeCommand = require("./command/convertTimeCommand.js");
const countdownCommand = require("./command/countdownCommand.js");
const ctftipsCommand = require("./command/ctftipsCommand.js");
const { Routes } = require("discord-api-types/v9");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

const ctfInfo = {
  name: "ctf",
  description: "Get information about the CTF event",
  options: [
    {
      name: "id_event",
      type: 3,
      description: "ID dari event CTF yang ingin kamu cari",
      required: true,
    },
  ],
};

const commands = [
  ctfInfo,
  convertTimeCommand.data,
  countdownCommand.data,
  ctftipsCommand.data,
];

const getCTFTimeEventInfo = async (id) => {
  const url = `https://ctftime.org/event/${id}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const $ = cheerio.load(text);
    const link = $(".span10 > p > a[rel='nofollow']").text();
    const img = `https://ctftime.org/${$(".span2 > img").attr("src")}`;
    const title = $("h2").text().trim();
    const dateElement = $(".span10 > p:eq(0)");
    const locationSite = $(".span10 > p:eq(1)").text().trim();
    const locationCTF = $(".span10 > p:eq(2)").text().trim();
    const format = $(".span10 > p:eq(4)").text().trim().replace("Format: ", "");
    const weight = $(".span10 > p:eq(7)")
      .text()
      .trim()
      .replace("Rating weight: ", "");

    const info = {
      title,
      link,
      img,
      date: dateElement.text().trim(),
      location: `${locationSite} - ${locationCTF}`,
      format,
      weight,
    };

    return info;
  } catch (error) {
    return null;
  }
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setActivity({
    name: "RKS",
    type: ActivityType.Watching,
    status: "idle",
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ctf") {
    const eventIdentifier = interaction.options.getString("id_event");

    const ctfEventInfo = await getCTFTimeEventInfo(eventIdentifier);

    if (ctfEventInfo) {
      const embed = {
        title: "CTF Event Information",
        fields: [
          {
            name: "ID",
            value: `${eventIdentifier}`,
            inline: true,
          },
          {
            name: "Format",
            value: `${ctfEventInfo.format}`,
            inline: true,
          },
          {
            name: "Location",
            value: ctfEventInfo.location,
          },
          {
            name: "Weight",
            value: ctfEventInfo.weight,
          },
          {
            name: "Date",
            value: ctfEventInfo.date,
            footer: {
              text: `Date: ${ctfEventInfo.date}`,
            },
          },
        ],
        thumbnail: {
          url: ctfEventInfo.img,
        },
        url: ctfEventInfo.link,
        color: 0xd76628,
      };

      interaction.reply({ embeds: [embed] });
    } else {
      interaction.reply("Sorry, Aku gak bisa dapat info dari event CTF itu.");
    }
  } else if (commandName === "converttime") {
    convertTimeCommand.execute(interaction);
  } else if (commandName === "countdown") {
    countdownCommand.execute(interaction);
  } else if (commandName === "ctftips") {
    ctftipsCommand.execute(interaction);
  }
});

client.login(process.env.TOKEN); //login bot using token
