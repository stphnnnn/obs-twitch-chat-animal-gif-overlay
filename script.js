const TWITCH_CHANNEL = "stphnnnnn";
const CAT_API = "https://api.thecatapi.com/v1/images/search?mime_types=gif";
const DOG_API = "https://api.thedogapi.com/v1/images/search?mime_types=gif";
const PAUSE_DURATION = 30 * 1000; // 30 seconds
const DISPLAY_DURATION = 10 * 1000; // 10 seconds

// Resolve promise after duration
const wait = async duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};


// Loops and calls each function in a queue
function Queue() {
  let queue = [];
  let isLooping = false;
  let isPaused = false;

  this.loop = async () => {
    isLooping = true;

    const item = queue[0];
    queue.shift();
    await item();

    if (!queue.length || isPaused) {
      isLooping = false;
      return;
    }

    this.loop();
  };

  this.add = item => {
    if (isPaused) return;

    queue.push(item);

    if (!isLooping) this.loop();
  };

  this.clear = () => {
    queue = [];
  };

  this.pause = (duration = 0) => {
    isPaused = true;
    setTimeout(() => (isPaused = false), duration);
  };

  this.isLooping = isLooping;
}

const queue = new Queue();
const gifContainer = document.querySelector(".gif");

const add = apiUrl => {
  queue.add(async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();

    gifContainer.innerHTML = `<img src="${data[0].url}" />`;
    gifContainer.style.opacity = 1;

    await wait(DISPLAY_DURATION);

    if (!queue.isLooping) {
      gifContainer.style.opacity = 0;
    }
  });
};

const handleMessage = (_, tags, message) => {
  if (message.toLowerCase() === "!catpls") add(CAT_API);
  if (message.toLowerCase() === "!dogpls") add(DOG_API);

  // Allow mods or broadcasters to pause the GIFs
  const isModOrBroadcaster = tags.badges.broadcaster || tags.mod;
  if (isModOrBroadcaster && message.toLowerCase() === "!stoppls") {
    // Clear GIF queue and pause for PAUSE_DURATION
    queue.clear();
    queue.pause(PAUSE_DURATION);
  }
};

// Connect to Twitch chat
const client = new tmi.client({ channels: [TWITCH_CHANNEL] });
client.connect();
client.on("message", handleMessage);