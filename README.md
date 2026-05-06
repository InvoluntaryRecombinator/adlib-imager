# AI Mad Libs Generator 🎨

This is a vanilla frontend project built as an exercise in manipulating the DOM, managing HTML forms, and transforming user data to achieve an output upon submission. 

It takes user inputs through various Mad Libs-style templates, stitches them into a master prompt, and uses an AI image generator API to bring that prompt to life on the screen.

## How to Run It Locally

To test this out in your own browser, you will need to hook it up to the image-generating API. 

1. **Get a free API Key:** Create a free account at [Pollinations.ai](https://pollinations.ai/) and generate a new API key.
2. **Set up the config:** Look in the project folder for a file named `config.example.js`.
3. **Rename it:** Change the file's name from `config.example.js` to `config.js`.
4. **Add your key:** Open the new `config.js` file, paste your API key inside the quotes, and save it.
5. **Bam.** Open `index.html` in your browser (or use VS Code Live Server) and start generating. See if you can guess what the prompt was that led to your image!
