const commands = [
  {
    command: "!catpls",
    condition: () => true,
    handler: async () => {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?mime_types=gif"
      );
      const data = await response.json();
      gifQueue.add(data[0].url);
    },
  },
  {
    command: "!dogpls",
    condition: () => true,
    handler: async () => {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?mime_types=gif"
      );
      const data = await response.json();
      gifQueue.add(data[0].url);
    },
  },
  {
    command: "!inspirepls",
    condition: () => true,
    handler: async () => {
      const response = await fetch("https://inspirobot.me/api?generate=true");
      const url = await response.text();
      gifQueue.add(url);
    },
  },
  {
    command: "!stoppls",
    condition: (tags, message) => tags.badges.broadcaster || tags.mod,
    handler: () => {
      gifQueue.clear();
      gifQueue.pause(PAUSE_DURATION);
    },
  },
];
