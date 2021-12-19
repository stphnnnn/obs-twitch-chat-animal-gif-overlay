const handlers = [
  {
    command: "!catpls",
    condition: () => true,
    handler: () =>
      gifQueue.add("https://api.thecatapi.com/v1/images/search?mime_types=gif"),
  },
  {
    command: "!dogpls",
    condition: () => true,
    handler: () =>
      gifQueue.add("https://api.thedogapi.com/v1/images/search?mime_types=gif"),
  },
  {
    command: "!stoppls",
    condition: (tags) => tags.badges.broadcaster || tags.mod,
    handler: () => {
      gifQueue.clear();
      gifQueue.pause(PAUSE_DURATION);
    },
  },
];
