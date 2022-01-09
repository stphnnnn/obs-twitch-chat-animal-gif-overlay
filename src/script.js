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

// Command handlers
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  commands.forEach((command) => {
    if (command.command === command) {
      if (command.condition(message, flags, extra)) {
        command.handler(message, flags, extra);
      }
    }
  });
};

ComfyJS.Init(getParam("channel"));
