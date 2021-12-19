# 🐱🐶 OBS/Twitch Animal GIF Overlay

Displays a cat or dog GIF in an OBS browser source when a user types the command `!dogpls` or `!catpls`.

The project uses:

- https://github.com/tmijs/tmi.js
- https://thecatapi.com/
- https://thedogapi.com/

## How to use

Add the `https://twitch-gif-overlay.vercel.app/?channel=YOUR_TWITCH_CHANNEL_NAME` as a [browser source](https://obsproject.com/wiki/Sources-Guide#browsersource) in OBS.

Example: `https://twitch-gif-overlay.vercel.app/?channel=stphnnnnn`

## Available commands

| Commands | Description                               |
| -------- | ----------------------------------------- |
| !catpls  | Displays a cat GIF                        |
| !dogpls  | Displays a dog GIF                        |
| !stoppls | Clears the queue and pause for 30 seconds |

## 🙇‍♂️ Contributing

If you'd like to contribute to this project, feel free to open an issue or a pull request as you see fit
