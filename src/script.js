const PAUSE_DURATION = 30 * 1000; // 30 seconds
const DISPLAY_DURATION = 10 * 1000; // 10 seconds

const gifQueue = new Queue({
  onAdd: (url) => async () => {
    const gifContainer = document.querySelector(".gif");
    gifContainer.innerHTML = `<img src="${url}" />`;
    gifContainer.style.opacity = 1;

    await new Promise((resolve) => setTimeout(resolve, DISPLAY_DURATION));

    if (!gifQueue.isLooping) {
      gifContainer.style.opacity = 0;
    }
  },
});

const getParam = (param) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
};

const client = new tmi.client({
  channels: [getParam("channel")],
  connection: {
    secure: true,
  },
});

client.connect();

// Command handlers
client.on("message", (channel, tags, message) => {
  commands.forEach((command) => {
    if (
      message.startsWith(command.command) &&
      command.condition(tags, message)
    ) {
      command.handler(tags, message);
    }
  });
});
