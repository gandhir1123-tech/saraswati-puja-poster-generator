# Saraswati Puja Personalized Poster Generator

A free static site for entering name and designation, optionally uploading a logo, previewing the design, and downloading a 1080 × 1920 PNG.

## Add your supplied poster
1. The poster image you shared is included as `poster-template.jpg`.
2. Keep it in the same folder as `index.html` and `script.js`.
3. Keep the original at 1080 × 1920 pixels for best results.
4. The script covers the sample `Placeholder` and `designation` text in the lower area and draws the entered details there. It optionally places a logo in the top “Photo” area.

Important: this template assumes the poster shown in the conversation is used as the background. If the uploaded image differs in size or the bottom placeholder area moves, tweak the `drawLogo()` and `drawPersonalization()` coordinates in `script.js`.

## Test locally
Open `index.html` in a browser. If the background image does not load, run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Publish free with GitHub Pages
1. Create a public repository at https://github.com/new.
2. Upload `index.html`, `script.js`, `README.md`, and `poster-template.jpg` to the repository root.
3. Go to Settings → Pages.
4. Select “Deploy from a branch”, branch `main`, folder `/(root)`, then Save.
5. Use the URL displayed by GitHub Pages and share it.

Names, designations, and uploaded logos are processed locally in the visitor's browser; no server or database is used.
