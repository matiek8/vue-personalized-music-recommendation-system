import Dexie from 'dexie';

const db = new Dexie('MyMusicAppDB');
db.version(1).stores({
  users: '++id,name, email, password',
  moods: '++id, userId, date, mood, moodScale, intensity',
  playlists: '++id, userId, playlistTitle, playlist'
});

export default db;