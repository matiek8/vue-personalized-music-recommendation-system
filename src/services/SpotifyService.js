import axios from 'axios'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID // Replace with your client ID
const SCOPES = ['streaming', 'user-read-email', 'user-read-private']

// PRODUCTION VERSION
// const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_PROD

// LOCAL VERSION
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_DEV

const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

export const searchTrack = async (song, artist, token) => {
  spotifyAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`

  try {
    const response = await spotifyAPI.get('/search', {
      params: {
        q: `${song} artist:${artist}`,
        type: 'track',
        limit: 1
      }
    });
    return response.data.tracks.items[0]; // returns the first matched track
  } catch (error) {
    console.error('Error fetching from Spotify:', error)
    throw error
  }
}

const getLoginURL = () => {
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&response_type=token&show_dialog=true`;
}

export const login = () => {
  window.location = getLoginURL()
};

export const getAccessToken = () => {
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  return params.get('access_token')
}