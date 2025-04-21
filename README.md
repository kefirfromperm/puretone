# Pure Tone Online

A web-based tone generator that allows you to play pure sine wave tones at specific frequencies.

## Description

Pure Tone Online is a simple, easy-to-use web application that generates pure sine wave tones. It allows users to:

- Play pure tones at specific frequencies (default is 440 Hz)
- Adjust the frequency using a slider
- Control the volume
- Select musical notes from C0 to C8 (covering the full piano range)
- Share the site on various social media platforms (Facebook, Twitter, LinkedIn, Telegram, WhatsApp)

The site is designed to be responsive and works on both desktop and mobile devices.

## Files and Structure

The project consists of the following files:

- `index.html` - The main HTML file containing the structure and UI elements
- `puretone.js` - JavaScript file with the tone generation logic using Web Audio API
- `favicon.ico` - Site favicon
- `icons/` - Directory containing various icon files for different platforms and sizes
- `CNAME` - Domain configuration for GitHub Pages
- `robots.txt` - Instructions for web crawlers
- `sitemap.xml` - XML sitemap for search engines
- `LICENSE` - License information

## Technologies Used

- **HTML5** - For structure and content
- **CSS** - For styling (via Bootstrap)
- **JavaScript** - For functionality
- **Web Audio API** - For generating audio tones
- **Bootstrap 5** - For responsive design and UI components
- **jQuery** - For DOM manipulation and event handling
- **Bootstrap Icons** - For UI icons
- **Google Analytics** - For site usage tracking

## How It Works

The application uses the Web Audio API to generate pure sine wave tones. The frequency is controlled either by:

1. Using the frequency slider
2. Clicking on musical note buttons
3. Directly specifying a frequency in the URL hash (e.g., `https://puretone.online/#440`)

The current frequency is displayed prominently and is also reflected in the page title.

## Deployment

The site is deployed using GitHub Pages with a custom domain. To deploy your own version:

1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. (Optional) Configure a custom domain:
    - Add your domain to the CNAME file
    - Set up DNS records for your domain to point to GitHub Pages
    - Configure SSL in GitHub Pages settings

The site is currently live at [https://puretone.online](https://puretone.online)

## Development

To run this project locally:

1. Clone the repository
2. Open `index.html` in your browser

No build process or server is required as this is a static site.

## License

See the LICENSE file for details.

## Author

Created by Vitalii Samolovskikh
