# Text Cursor Golf

Text Cursor Golf is a tiny browser game inspired by Vimgolf. Edit the given line until it matches the target, using as few keystrokes as possible.

![image](https://github.com/user-attachments/assets/916408a0-8b43-4f54-9175-58a659347e30)

**[Play Text Cursor Golf](https://afloresescarcega.github.io/text-cursor-golf/)** · [View the source on GitHub](https://github.com/afloresescarcega/text-cursor-golf)

## Features

- 28 built-in challenges, including typo fixes, word moves, replacements, and trims
- A compact score display with current score, personal best, and solved count
- Best scores saved locally in your browser; no account required
- Custom challenges for experimenting with your own text edits
- A responsive, animated background built with native CSS
- No build step, package manager, CDN, or runtime dependency

## How to play

1. Choose a built-in challenge.
2. Edit the text in the input until it exactly matches the target.
3. Use the keyboard to navigate and edit. Cursor moves and shortcut actions count; modifier-only presses do not.
4. Finish with the lowest score you can. Your best built-in scores are saved on this device.

## Run locally

The game is a single static `index.html` file. Open it directly, or serve the folder locally:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## GitHub Pages

The live site is published from the `gh-pages` branch at:

<https://afloresescarcega.github.io/text-cursor-golf/>

## Contributing

Contributions are welcome. Open an issue or submit a pull request with a focused improvement.

## License

This project is open source and available under the [MIT License](LICENSE).
