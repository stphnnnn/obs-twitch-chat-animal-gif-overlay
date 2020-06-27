const TWITCH_CHANNEL = "stphnnnnn";
const CAT_API = "https://api.thecatapi.com/v1/images/search?mime_types=gif";
const DOG_API = "https://api.thedogapi.com/v1/images/search?mime_types=gif";
const PAUSE_DURATION = 30 * 1000; // 30 seconds
const DISPLAY_DURATION = 10 * 1000; // 10 seconds

// Connect to Twitch chat
const client = new tmi.client({
  channels: [TWITCH_CHANNEL],
});

client.connect();
client.on("message", handleMessage);

const gifContainer = document.querySelector(".gif");
gifContainer.style.opacity = 0;

let gifQueue = [];
let isPaused = false;
let isDisplayingQueue = false;

async function handleMessage(channel, tags, message) {
  if (message.toLowerCase() === "!catpls") {
    await addGifToQueue(CAT_API);

    if (!isDisplayingQueue) {
      displayGifsInQueue();
    }
  }

  if (message.toLowerCase() === "!dogpls") {
    await addGifToQueue(DOG_API);

    if (!isDisplayingQueue) {
      displayGifsInQueue();
    }
  }

  // Allow mods or broadcasters to pause the GIFs
  const isModOrBroadcaster = tags.badges.broadcaster || tags.mod;
  if (isModOrBroadcaster && message.toLowerCase() === "!stoppls") {
    pauseGifDisplay();
  }
}

const addGifToQueue = async (apiUrl) => {
  if (isPaused) {
    return;
  }

  const response = await fetch(apiUrl);
  const data = await response.json();
  const gif = data[0].url;

  return gifQueue.push(gif);
};

const displayGifsInQueue = () => {
  if (!gifQueue.length || isPaused) {
    isDisplayingQueue = false;
    return;
  }

  isDisplayingQueue = true;

  gifContainer.innerHTML = `<img src="${gifQueue[0]}" />`;
  gifContainer.style.opacity = 1;

  // Stops displaying after DISPLAY_DURATION and check the queue again
  displayTimer = setTimeout(() => {
    gifQueue.shift(); // Removes the displayed GIF from the queue
    gifContainer.style.opacity = 0;
    displayGifsInQueue();
  }, DISPLAY_DURATION);
};

// Clear GIF queue and enable paused state
const pauseGifDisplay = () => {
  gifQueue = [];
  isPaused = true;

  // Un-pause GIF displaying after PAUSE_DURATION
  setTimeout(() => {
    isPaused = false;
  }, PAUSE_DURATION);
};
