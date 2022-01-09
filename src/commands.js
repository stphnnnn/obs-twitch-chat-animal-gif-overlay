const commands = [
  {
    command: "!catpls",
    condition: () => true,
    handler: async () => {
      const repsonse = await fetch(
        "https://api.thecatapi.com/v1/images/search?mime_types=gif"
      );
      const data = await repsonse.json();
      gifQueue.add(data[0].url);
    },
  },
  {
    command: "!dogpls",
    condition: () => true,
    handler: async () => {
      const repsonse = await fetch(
        "https://api.thecatapi.com/v1/images/search?mime_types=gif"
      );
      const data = await repsonse.json();
      gifQueue.add(data[0].url);
    },
  },
  {
    command: "!inspirepls",
    condition: () => true,
    handler: async () => {
      const repsonse = await fetch("https://inspirobot.me/api?generate=true");
      const url = await repsonse.text();
      gifQueue.add(url);
    },
  },
  {
    command: "!stoppls",
    condition: (message, flags) => flags.broadcaster || flags.mod,
    handler: () => {
      gifQueue.clear();
      gifQueue.pause(PAUSE_DURATION);
    },
  },
];
