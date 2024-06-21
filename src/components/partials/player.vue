<template lang="pug">
transition(name="fade-slide")
  .player(:class="{'active': showPlayer}" @click="openPlaylist")
    .audio(v-if="playing")
    .info
      .img
        img(v-if="computedCover" :src="computedCover")
        .cover(v-else)
      .song
        .name {{song.song}}
        .artist {{song.artist}}
    .btns
      .close.btn(@click.stop="closePlayer")
        svg(width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(d="M11.6667 11.6667L28.3334 28.3334M11.6667 28.3334L28.3334 11.6667" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round")
      .play.btn(v-if="!playing" @click.stop="resume")
        svg(xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none")
          path(d="M28.99 21.7425L13.0825 30.9725C11.7325 31.755 10 30.8075 10 29.23V10.77C10 9.19502 11.73 8.24502 13.0825 9.03002L28.99 18.26C29.2971 18.4353 29.5524 18.6887 29.7299 18.9945C29.9075 19.3003 30.001 19.6477 30.001 20.0013C30.001 20.3549 29.9075 20.7022 29.7299 21.008C29.5524 21.3138 29.2971 21.5672 28.99 21.7425Z" fill="white")
      .pause.btn(v-else @click.stop="pauseSong")
        svg(xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none")
          path(d="M23.3333 31.6666V8.33331H30V31.6666H23.3333ZM10 31.6666V8.33331H16.6667V31.6666H10Z" fill="white")
      .next.btn(@click.stop="nextSong")
        svg(xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none")
          path(d="M35.506 30.9164V9.0284L35.5064 9.0264L35.506 9.0244V8.9304H35.4964C35.4732 8.67968 35.3573 8.44661 35.1714 8.27677C34.9855 8.10693 34.743 8.01252 34.4912 8.012C34.4792 8.012 34.468 8.0152 34.4564 8.0156H32.6288C32.6004 8.0132 32.5728 8.0072 32.5436 8.0072C32.2745 8.00731 32.0164 8.11426 31.8261 8.30455C31.6359 8.49484 31.5289 8.75289 31.5288 9.022C31.5288 9.0688 31.5364 9.114 31.5428 9.1592V18.4156L18.2064 10.7156C18.1113 10.6216 17.9908 10.5574 17.8597 10.531C17.7286 10.5046 17.5927 10.517 17.4686 10.5668C17.3445 10.6166 17.2377 10.7016 17.1612 10.8114C17.0848 10.9211 17.0421 11.0507 17.0384 11.1844H17.036V17.284L5.6592 10.7152C5.5641 10.6212 5.4436 10.557 5.31252 10.5306C5.18145 10.5042 5.0455 10.5166 4.92141 10.5664C4.79731 10.6162 4.69048 10.7012 4.61405 10.811C4.53761 10.9207 4.49491 11.0503 4.4912 11.184H4.4892V28.7964C4.48939 28.933 4.53027 29.0664 4.60662 29.1796C4.68297 29.2929 4.79133 29.3808 4.91787 29.4321C5.0444 29.4835 5.18338 29.496 5.31706 29.4681C5.45073 29.4401 5.57305 29.373 5.6684 29.2752L17.036 22.712V28.7968C17.0362 28.9334 17.0771 29.0668 17.1534 29.18C17.2298 29.2933 17.3381 29.3812 17.4647 29.4325C17.5912 29.4839 17.7302 29.4964 17.8639 29.4685C17.9975 29.4405 18.1199 29.3734 18.2152 29.2756L31.5428 21.5808V30.9336H31.548C31.5472 30.9492 31.5432 30.9636 31.5432 30.9792C31.5433 31.2479 31.65 31.5056 31.8399 31.6958C32.0297 31.886 32.2873 31.9931 32.556 31.9936H34.4968V31.984C34.6301 31.984 34.762 31.9578 34.8851 31.9068C35.0083 31.8558 35.1201 31.781 35.2144 31.6868C35.3086 31.5925 35.3834 31.4807 35.4344 31.3575C35.4853 31.2344 35.5116 31.1025 35.5116 30.9692C35.5112 30.9508 35.5068 30.934 35.506 30.9164Z" fill="white")
</template>

<script>
import {useUserStore}         from '@/stores/user'
import {mapActions, mapState} from 'pinia'

export default {
  name: 'player-component',
  data() {
    return {
      playlist: {},
      playing: false,
      index: 0,
      song: {},
      audio: null,
      deviceId: null,
      player: null
    }
  },
  computed: {
    ...mapState(useUserStore, ['showPlayer', 'isShuffle', 'newPlaylist', 'spotifyToken', 'spotifyExpiration', 'spotifyDeviceId', 'indexToPlay']),
    computedCover() {
      if(this.song?.info?.album?.images.length) {
        let imgs = this.song?.info?.album?.images
        return imgs[imgs.length-1].url
      }
      return ''
    }
  },
  watch: {
    $route(to) {
      if(['auth', 'signin', 'signup'].includes(to.name)) {
        this.closePlayer()
      }
    },
    showPlayer(newVal) {
      if(newVal) {
        this.index = this.indexToPlay
        this.playlist = this.newPlaylist
        this.createQueue()
      }
    }
  },
  mounted() {
    if(this.showPlayer) {
      this.deviceId = this.spotifyDeviceId
      this.index = this.indexToPlay
      this.playlist = this.newPlaylist
      this.createQueue()
    }
  },
  methods: {
    ...mapActions(useUserStore, ['hidePlayer', 'getSpotifyAccessToken', 'setDeviceId', 'selectPlaylist', 'updateIndex']),
    openPlaylist() {
      this.selectPlaylist(this.playlist)
      this.$router.push({name: 'playlist'})
    },
    async createQueue() {
      if (this.playlist.playlist.length) {
        this.song = this.playlist.playlist[this.index]

        this.playing = true
        if (new Date().getTime() > this.spotifyExpiration) {
          await this.getSpotifyAccessToken()
        }
        await this.connectToSpotify()
      }
    },
    connectToSpotify() {
      if (window.Spotify) {
        if(!this.player) {
          this.player = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => {
              cb(this.spotifyToken);
            },
            volume: 0.1
          });

          // Error handling
          this.player.addListener('initialization_error', ({message}) => {
            console.error(message);
          });
          this.player.addListener('authentication_error', ({message}) => {
            console.error(message);
          });
          this.player.addListener('account_error', ({message}) => {
            console.error(message);
          });
          this.player.addListener('playback_error', ({message}) => {
            console.error(message);
          });

          // Playback status updates
          this.player.addListener('player_state_changed', state => {
            this.onStateChanged(state)
          });

          // Ready
          this.player.addListener('ready', ({device_id}) => {
            console.log('Ready with Device ID', device_id);
            this.deviceId = device_id;
            this.setDeviceId(device_id)
            this.play()
          });

          // Not Ready
          this.player.addListener('not_ready', ({device_id}) => {
            console.log('Device ID has gone offline', device_id);
          });

          // Connect to the player!
          this.player.connect();
        } else {
          this.play()
        }
      }
    },
    play() {
      // Play a track using our new device ID
      this.playing = true
      if(this.song?.info?.uri) {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({uris: [this.song.info.uri]}),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.spotifyToken}`
          },
        });
      } else {
        this.nextSong()
      }
    },
    onStateChanged(state) {
      if (state !== null && state.position === 0 && state.paused) {
        // Track playback has finished, play the next track
        this.nextSong();
      }
    },
    resume() {
      this.player.resume().then(() => {
        console.log('Resumed!');
      })
      this.playing = true
    },
    closePlayer() {
      this.pauseSong()
      this.hidePlayer()
    },
    pauseSong() {
      this.player.pause().then(() => {
        console.log('Paused!');
      });
      this.playing = false
    },
    nextSong() {
      let max = this.playlist.playlist.length
      if (this.isShuffle) {
        this.index = Math.floor(Math.random() * max)
      }
      else {
        this.index = (max - 1 <= this.index) ? 0 : this.index + 1
      }
      this.updateIndex(this.index)
      this.song = this.playlist.playlist[this.index]
      this.play()
    }
  }
}
</script>

<style scoped lang="scss">
.player {
  cursor: pointer;
  position: absolute;
  bottom: 100px;
  width: 100%;
  background-color: #64CD7D;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 30px;
  box-sizing: border-box;
  height: 90px;
  transform: translateY(100px);
  transition: all 0.3s ease;
  opacity: 0;
  z-index: 100;

  @media (max-width: 480px) and (max-height: 900px)  {
    position: fixed;
  }

  &.active {
    transform: translateY(40px);
    opacity: 1;
  }

  .img {
    width: 40px;
    height: 40px;

    .cover {
      width: 100%;
      height: 100%;
      background-color: #2A2B2B;
      border-radius: 10px;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }

  .info {
    display: flex;
    align-items: center;
    gap: 20px;

    .song {
      display: flex;
      flex-direction: column;
      width: 150px;
    }

    .name {
      font-size: 14px;
    }
    .artist {
      opacity: 0.5;
      font-size: 14px;
    }

    .name,.artist {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .btns {
    display: flex;
    gap: 10px;

    .btn {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        opacity: 0.7;
      }

      &:active {
        opacity: 0.5;
      }
    }
  }
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(350px);
}
</style>