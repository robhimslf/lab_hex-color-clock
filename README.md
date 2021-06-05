# lab_hex-color-clock

A simple clock using the corresponding hex triplets to display a background color.

## 💡 The Concept

HTML color codes are *hex triplets* (six characters, three bytes) that look like this:

```
// This is rad... and red.
#ff0000
```

Something else that also happens to be six characters? The time in zero-padded format:

```
// The current time somewhere in the world.
01:07:12 PM
```

Based on a pretty nifty concept by [Jamel Hammoud](https://github.com/JamelHammoud/hextime), this small tinkering renders the current time while also using that time to generate a hex color code to paint the background.

Where Jamel's code is written in JavaScript, mine is written in TypeScript with additional sugar to show the various ways that the hex code can be used as a color. This includes displays of the current time as RGB (red, green, blue) and HSL (hue, saturation, lightness).

## 🚀 See It

### Locally

Super easy.

1. Clone the repo (or [download the zip](https://github.com/robhimslf/lab_hex-color-clock/archive/refs/heads/main.zip))
2. Open your terminal of choice.
3. Run `npm install` or `yarn install`
4. Run `npm start` or `yarn start`

### Live

You can find it on [netlify](https://infallible-mahavira-4b9840.netlify.app/)

## 💖 Credits

- [hextime](https://github.com/JamelHammoud/hextime) - Jamel Hammoud's original concept