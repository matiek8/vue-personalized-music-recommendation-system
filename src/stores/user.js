import db                            from '@/database'
import {getOpenAIResponse}          from '@/services/OpenAIService'
import {getAccessToken, searchTrack} from '@/services/SpotifyService'
import { defineStore }               from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // user
    isAuth: false,
    id: '',
    name: '',
    email: '',
    password: '',
    // music
    newPlaylist: {},
    addedPlaylists: [],
    // spotify
    spotifyToken: '',
    spotifyExpiration: '',
    spotifyDeviceId: '',
    // player
    showPlayer: false,
    isShuffle: false,
    indexToPlay: 0,
    playerPlaylistTitle: ''
  }),
  persist: {
    storage: sessionStorage,
  },
  actions: {
    async signInDb(email, password) {
      const user = await db.users.where('email').equals(email).and(user => user.password === password).first();
      if (user) {
        this.name = user.name
        this.email = user.email
        this.password = user.password
        this.id = user.id
        this.isAuth = true
        await this.getAddedPlaylists()
        return true
      } else {
        return false
      }
    },
    async signUpDb(email, password, name) {
      const existingUser = await db.users.where('email').equals(email).first()
      if(existingUser) {
        return false
      } else {
        let userId = await db.users.add({ email: email, password: password, name: name })
        this.id = userId
        this.name = name
        this.email = email
        this.password = password
        this.isAuth = true
        return true
      }
    },
    async deleteAccDb() {
      this.hidePlayer()
      await db.users.delete(this.id);
      this.id = ''
      this.name = ''
      this.email = ''
      this.password = ''
      this.spotifyToken = ''
      this.isAuth = false
    },
    async logOutDb() {
      this.hidePlayer()
      this.name = ''
      this.email = ''
      this.password = ''
      this.spotifyToken = ''
      this.isAuth = false
    },
    async editAccountDb(email, password, name) {
      this.name = name ? name : this.name
      this.password = password ? password : this.password
      this.email = email ? email : this.email
  
      await db.users.update(this.id, {email: this.email, password: this.password, name: this.name})
    },
    getSpotifyAccessToken() {
      let token = this.spotifyToken? this.spotifyToken: getAccessToken()
      this.spotifyToken = token
      this.spotifyExpiration = new Date().getTime() + 3600 * 1000
    },
    setDeviceId(id) {
      this.spotifyDeviceId = id
    },
    async saveMood(mood, moodScale, intensity) {
      await db.moods.add({ userId: this.id, date: new Date(), mood: JSON.stringify(mood), moodScale: moodScale, intensity: intensity })
    },
    async getMoodHistory() {
      const history = await db.moods.where('userId').equals(this.id).toArray()
      return history
    },
    async generateOpenAiPlaylist(selectedMoods, moodScale, intensity) {
      await this.saveMood(selectedMoods, moodScale, intensity)
      try {
        const openAIResponse = await getOpenAIResponse(moodScale, selectedMoods, intensity)
        const res = openAIResponse.substring(openAIResponse.indexOf("{"), openAIResponse.lastIndexOf("}")+1)
        let jsonPlaylist = JSON.parse(res)
        if (jsonPlaylist.playlist.length) {
          this.newPlaylist = jsonPlaylist
          this.newPlaylist['playlistId'] = null
          await this.getSpotifyInfo()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getSpotifyInfo() {
      if (new Date().getTime() > this.spotifyExpiration) {
        await this.logOutDb()
      }
      if(this.newPlaylist.playlist.length) {
        this.newPlaylist.playlist.map(async (item)=> {
          item['info'] = await searchTrack(item.song, item.artist, this.spotifyToken)
        })
      }
    },
    async addPlaylistToFav() {
      const playlistId = await db.playlists.add({ userId: this.id, playlistTitle: this.newPlaylist.playlistTitle, playlist: JSON.stringify(this.newPlaylist.playlist)})
      this.newPlaylist.id = playlistId
      this.addedPlaylists.push(this.newPlaylist)
    },
    async removePlaylistFromFav() {
      
      await db.playlists.delete(this.newPlaylist.id)
      await this.getAddedPlaylists()
    },
    async getAddedPlaylists() {
      let playlists = await db.playlists.where('userId').equals(this.id).toArray()
      playlists.forEach((item)=> {
        item.playlist = JSON.parse(item.playlist)
      })
      this.addedPlaylists = playlists
    },
    hidePlayer() {
      this.indexToPlay = 0
      this.playerPlaylistTitle = ''
      this.isShuffle = false
      this.showPlayer = false
    },
    async playPlaylist(isShuffle=false, index = 0) {
      let max = this.newPlaylist.playlist.length
      this.indexToPlay = index? index: (isShuffle? Math.floor(Math.random() * max) : 0)
      this.isShuffle = isShuffle
      this.showPlayer = true
      this.playerPlaylistTitle = this.newPlaylist.playlistTitle
    },
    updateIndex(index=0) {
      this.indexToPlay = index
    },
    async selectPlaylist(playlist) {
      this.newPlaylist = playlist
    }
  }
})
