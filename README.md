# tab-url-quick-grabber
A Chrome extension to quickly grab and copy tab URLs by domain via a popup. (Manifest V3)

## Features
- **Dynamic Domain Detection**: Automatically lists all domains currently open in the window.
- **One-Click Copy**: Copy all URLs of a specific domain to your clipboard instantly.
- **Reliable Clipboard Action**: Uses the latest Manifest V3 Offscreen Documents API for stable copying.

## How to Install (Developer Mode)
1. Download or clone this repository.
2. Open `chrome://extensions/` in your Chrome browser.
3. Enable **"Developer mode"** in the top right corner.
4. Click **"Load unpacked"** and select the folder containing these files.
5. Pin the extension for quick access!
6.Have fun!

## Technical Details
- **Manifest V3**: Fully compliant with the latest Chrome extension standards.
- **Service Worker & Offscreen Document**: Implements a robust messaging system between the background script and an offscreen document to handle clipboard operations securely.
- **Efficiency**: Uses `Set` and `filter` for high-performance domain extraction and URL matching.

## Development
Developed with AI assistance (Gemini) and manually optimized for logic, accessibility, and performance.

## License
[MIT License](LICENSE)
