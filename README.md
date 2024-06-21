# Personalized Music Recommendation System (PMRS)

## Live Demo
Check out the [Live Demo of PMRS](https://courageous-manatee-3203cb.netlify.app)


## Description
The Personalized Music Recommendation System (PMRS) is an innovative web application designed to suggest music playlists based on user mood inputs. Utilizing the OpenAI API for mood-based song recommendations and the Spotify API for detailed song information, PMRS offers a unique and interactive way to discover music that resonates with your current emotions.

## Features
- User Authentication: Sign in or sign up functionality with data stored in IndexedDB.
- Mood-Based Playlist Generation: Generate playlists based on user mood using OpenAI API.
- Spotify Integration: Fetch song information and manage playback using Spotify SDK.
- Mood History: Track and visualize past moods and playlist choices with Chart.js.
- Responsive Design: A seamless experience across various devices and screen sizes.

## Technologies Used
- **Front-end**: Vue.js
- **Database**: Dexie.js with IndexedDB
- **APIs**: OpenAI API, Spotify API
- **Music Playback**: Spotify SDK
- **Design Tool**: Figma
- **Deployment**: Netlify

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- A Spotify Developer account and API key
- Access to OpenAI API

### Installation
1. Clone the repository:

```sh
git clone https://github.com/matiek8/pmrs-spotify-ai-vue.git
```

2. Navigate to the project directory:

```sh
cd pmrs
```

3. Install dependencies:

```sh
npm install
```

4. Create a `.env` file and add your Spotify and OpenAI API keys:

```sh
VITE_OPENAI=Bearer YOUR_OPENAI_KEY
VITE_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
VITE_SPOTIFY_REDIRECT_PROD=YOUR_SPOTIFY_REDIRECT_LINK_PROD
VITE_SPOTIFY_REDIRECT_DEV=YOUR_SPOTIFY_REDIRECT_LINK_DEV
```

5. Compile and Hot-Reload for Development:

```sh
npm run dev
```

6. Compile and Minify for Production
```sh
npm run build
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments
- OpenAI team for the GPT models
- Spotify for their comprehensive API
- Contributors and testers who helped in refining this project
