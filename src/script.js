const PAUSE_DURATION = 30 * 1000; // 30 seconds
const DISPLAY_DURATION = 10 * 1000; // 10 seconds

const gifQueue = new Queue({
  onAdd: (url) => async () => {
    const response = await fetch(url);
    const data = await response.json();

    const gifContainer = document.querySelector(".gif");
    gifContainer.innerHTML = `<img src="${data[0].url}" />`;
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

// Connect to Twitch chat
const client = new tmi.client({ channels: [getParam("channel")] });
client.connect();

client.on("message", (channel, tags, message) => {
  handlers.forEach((handler) => {
    if (
      message.startsWith(handler.command) &&
      handler.condition(tags, message)
    ) {
      handler.handler(tags, message);
    }
  });
});
