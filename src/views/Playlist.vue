<template lang="pug">
.playlist
  .playlist__wr(:class="{'active': playlistIsActive}")
    .cover
      .cover__wr
        .add(@click="togglePlaylist")
          svg(v-if="!isAdded" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(fill-rule="evenodd" clip-rule="evenodd" d="M0.166656 21C0.166656 9.49377 9.49374 0.166687 21 0.166687C32.5062 0.166687 41.8333 9.49377 41.8333 21C41.8333 32.5063 32.5062 41.8334 21 41.8334C9.49374 41.8334 0.166656 32.5063 0.166656 21ZM21 4.33335C16.5797 4.33335 12.3405 6.0893 9.21488 9.21491C6.08927 12.3405 4.33332 16.5797 4.33332 21C4.33332 25.4203 6.08927 29.6595 9.21488 32.7851C12.3405 35.9107 16.5797 37.6667 21 37.6667C25.4203 37.6667 29.6595 35.9107 32.7851 32.7851C35.9107 29.6595 37.6667 25.4203 37.6667 21C37.6667 16.5797 35.9107 12.3405 32.7851 9.21491C29.6595 6.0893 25.4203 4.33335 21 4.33335Z" fill="white")
            path(fill-rule="evenodd" clip-rule="evenodd" d="M23.0833 10.5833C23.0833 10.0308 22.8638 9.5009 22.4731 9.11019C22.0824 8.71949 21.5525 8.5 21 8.5C20.4475 8.5 19.9176 8.71949 19.5269 9.11019C19.1362 9.5009 18.9167 10.0308 18.9167 10.5833V18.9167H10.5833C10.0308 18.9167 9.5009 19.1362 9.11019 19.5269C8.71949 19.9176 8.5 20.4475 8.5 21C8.5 21.5525 8.71949 22.0824 9.11019 22.4731C9.5009 22.8638 10.0308 23.0833 10.5833 23.0833H18.9167V31.4167C18.9167 31.9692 19.1362 32.4991 19.5269 32.8898C19.9176 33.2805 20.4475 33.5 21 33.5C21.5525 33.5 22.0824 33.2805 22.4731 32.8898C22.8638 32.4991 23.0833 31.9692 23.0833 31.4167V23.0833H31.4167C31.9692 23.0833 32.4991 22.8638 32.8898 22.4731C33.2805 22.0824 33.5 21.5525 33.5 21C33.5 20.4475 33.2805 19.9176 32.8898 19.5269C32.4991 19.1362 31.9692 18.9167 31.4167 18.9167H23.0833V10.5833Z" fill="white")
          svg(v-else xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none")
            path(d="M33.25 36.75L21 31.5L8.75 36.75V8.74998C8.75 6.82498 10.325 5.24998 12.25 5.24998H24.5C23.4364 6.67032 22.8296 8.38035 22.76 10.1534C22.6904 11.9265 23.1612 13.6788 24.1102 15.1782C25.0592 16.6775 26.4414 17.8531 28.0736 18.549C29.7059 19.2449 31.5111 19.4284 33.25 19.075V36.75ZM31.2025 15.75L26.25 10.7975L28.7175 8.32998L31.185 10.7975L37.38 4.60248L39.8475 7.06998L31.2025 15.75Z" fill="white")
        .btns
          .play(@click="play('direct')" :class="{'active': computedPlaylistAction==='play'}")
            svg(width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg")
              g(clip-path="url(#clip0_12_230)")
                path(d="M40 0C50.6087 0 60.7828 4.21427 68.2843 11.7157C75.7857 19.2172 80 29.3913 80 40C80 50.6087 75.7857 60.7828 68.2843 68.2843C60.7828 75.7857 50.6087 80 40 80C29.3913 80 19.2172 75.7857 11.7157 68.2843C4.21427 60.7828 0 50.6087 0 40C0 29.3913 4.21427 19.2172 11.7157 11.7157C19.2172 4.21427 29.3913 0 40 0ZM7.5 40C7.5 48.6195 10.9241 56.886 17.019 62.981C23.114 69.0759 31.3805 72.5 40 72.5C48.6195 72.5 56.886 69.0759 62.981 62.981C69.0759 56.886 72.5 48.6195 72.5 40C72.5 31.3805 69.0759 23.114 62.981 17.019C56.886 10.9241 48.6195 7.5 40 7.5C31.3805 7.5 23.114 10.9241 17.019 17.019C10.9241 23.114 7.5 31.3805 7.5 40ZM31.895 26.135L53.215 38.93C53.3992 39.0413 53.5516 39.1982 53.6574 39.3857C53.7632 39.5732 53.8188 39.7848 53.8188 40C53.8188 40.2152 53.7632 40.4268 53.6574 40.6143C53.5516 40.8018 53.3992 40.9587 53.215 41.07L31.895 53.865C31.7054 53.9792 31.4889 54.041 31.2676 54.0441C31.0463 54.0473 30.8281 53.9916 30.6354 53.8827C30.4427 53.7739 30.2823 53.6159 30.1707 53.4248C30.059 53.2337 30.0001 53.0163 30 52.795V27.21C29.9992 26.9882 30.0575 26.7703 30.1688 26.5785C30.28 26.3867 30.4403 26.2279 30.6332 26.1185C30.8261 26.0091 31.0446 25.9529 31.2663 25.9558C31.4881 25.9587 31.7051 26.0206 31.895 26.135Z" fill="white")
              defs
                clipPath(id="clip0_12_230")
                  rect(width="80" height="80" fill="white")
          .shuffle(@click="play('shuffle')" :class="{'active': computedPlaylistAction==='shuffle'}")
            svg(width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg")
              path(d="M75.1531 54.8469C75.5027 55.1953 75.7801 55.6092 75.9694 56.065C76.1587 56.5209 76.2561 57.0096 76.2561 57.5031C76.2561 57.9967 76.1587 58.4854 75.9694 58.9412C75.7801 59.397 75.5027 59.811 75.1531 60.1594L67.6531 67.6594C66.9487 68.3638 65.9932 68.7596 64.9969 68.7596C64.0006 68.7596 63.0451 68.3638 62.3406 67.6594C61.6362 66.9549 61.2404 65.9994 61.2404 65.0031C61.2404 64.0068 61.6362 63.0513 62.3406 62.3469L63.4375 61.25H62.7844C59.0043 61.2458 55.2796 60.3414 51.9186 58.6117C48.5575 56.882 45.6567 54.3767 43.4563 51.3031L30.4313 33.0562C28.926 30.9528 26.9412 29.2383 24.6414 28.0547C22.3416 26.871 19.7928 26.2524 17.2063 26.25H10C9.00544 26.25 8.05161 25.8549 7.34835 25.1516C6.64509 24.4484 6.25 23.4946 6.25 22.5C6.25 21.5054 6.64509 20.5516 7.34835 19.8483C8.05161 19.1451 9.00544 18.75 10 18.75H17.2063C20.9863 18.7542 24.711 19.6585 28.0721 21.3883C31.4331 23.118 34.3339 25.6233 36.5344 28.6969L49.5688 46.9437C51.074 49.0472 53.0588 50.7617 55.3586 51.9453C57.6585 53.1289 60.2072 53.7476 62.7938 53.75H63.4375L62.3375 52.6531C61.633 51.9486 61.2372 50.9932 61.2372 49.9969C61.2372 49.0006 61.633 48.0451 62.3375 47.3406C63.042 46.6361 63.9975 46.2404 64.9938 46.2404C65.99 46.2404 66.9455 46.6361 67.65 47.3406L75.1531 54.8469ZM45.2719 32.1531C46.0204 32.8077 46.9982 33.1382 47.9903 33.072C48.9824 33.0058 49.9077 32.5482 50.5625 31.8C52.0879 30.0565 53.9683 28.6593 56.0779 27.7021C58.1874 26.7449 60.4772 26.2498 62.7938 26.25H63.4375L62.3375 27.3469C61.633 28.0513 61.2372 29.0068 61.2372 30.0031C61.2372 30.9994 61.633 31.9549 62.3375 32.6594C63.042 33.3638 63.9975 33.7596 64.9938 33.7596C65.99 33.7596 66.9455 33.3638 67.65 32.6594L75.15 25.1594C75.4996 24.811 75.777 24.397 75.9663 23.9412C76.1555 23.4854 76.253 22.9967 76.253 22.5031C76.253 22.0096 76.1555 21.5209 75.9663 21.065C75.777 20.6092 75.4996 20.1953 75.15 19.8469L67.65 12.3469C66.9455 11.6424 65.99 11.2466 64.9938 11.2466C63.9975 11.2466 63.042 11.6424 62.3375 12.3469C61.633 13.0513 61.2372 14.0068 61.2372 15.0031C61.2372 15.9994 61.633 16.9549 62.3375 17.6594L63.4375 18.75H62.7844C59.3979 18.7516 56.0509 19.4774 52.9679 20.8788C49.885 22.2801 47.1373 24.3246 44.9094 26.875C44.2598 27.624 43.9333 28.5998 44.0012 29.5889C44.0691 30.578 44.526 31.5 45.2719 32.1531ZM34.7281 47.8469C33.9796 47.1923 33.0018 46.8617 32.0097 46.928C31.0176 46.9942 30.0923 47.4517 29.4375 48.2C27.9121 49.9435 26.0317 51.3406 23.9221 52.2978C21.8126 53.2551 19.5228 53.7502 17.2063 53.75H10C9.00544 53.75 8.05161 54.1451 7.34835 54.8483C6.64509 55.5516 6.25 56.5054 6.25 57.5C6.25 58.4946 6.64509 59.4484 7.34835 60.1516C8.05161 60.8549 9.00544 61.25 10 61.25H17.2063C20.5928 61.2484 23.9398 60.5225 27.0227 59.1212C30.1057 57.7199 32.8533 55.6754 35.0813 53.125C35.732 52.3772 36.0601 51.4021 35.9939 50.4131C35.9278 49.424 35.4727 48.5013 34.7281 47.8469Z" fill="white")
        .label {{newPlaylist.playlistTitle}}
        .text {{text}}
    .list(:class="{'with-player':showPlayer}")
      SongComponent(v-for="(item, index) in newPlaylist.playlist" :song="item" :key="item.song" :isActive="computedActiveSong===index" @click="playSong(index)")
</template>

<script>
import SongComponent  from '@/components/partials/song-component.vue'
import {useUserStore}         from '@/stores/user'
import {mapActions, mapState} from 'pinia'

export default {
  name: 'PlaylistPage',
  components: {SongComponent},
  data() {
    return {
      playlistIsActive: false,
      playerIsActive: false,
      text: "Made specially for you with a great care",
      selectedSong: {},
      isAdded: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['newPlaylist', 'addedPlaylists', 'showPlayer', 'playerPlaylistTitle', 'isShuffle', 'indexToPlay']),
    computedPlaylistIsPlaying() {
      return this.showPlayer && this.newPlaylist.playlistTitle === this.playerPlaylistTitle
    },
    computedPlaylistAction() {
      return this.computedPlaylistIsPlaying? (this.isShuffle? 'shuffle': 'play'): 'view'
    },
    computedActiveSong() {
      return this.computedPlaylistIsPlaying ? this.indexToPlay: null
    }
  },
  mounted() {
    const addedId = this.addedPlaylists.map(item=> {
      return item.id
    })
    this.isAdded = this.newPlaylist.id ? (addedId.includes(this.newPlaylist.id)): false
    setTimeout(()=>{
      this.playlistIsActive = true
    }, 10)
  },
  beforeUnmount() {
    this.playlistIsActive = false
  },
  methods: {
    ...mapActions(useUserStore, ['addPlaylistToFav', 'removePlaylistFromFav', 'playPlaylist', 'hidePlayer']),
    togglePlaylist() {
      if(this.isAdded) this.removePlaylistFromFav()
      else this.addPlaylistToFav()
      this.isAdded = !this.isAdded
    },
    playSong(index) {
      this.hidePlayer()
      setTimeout(()=> {
        this.playPlaylist(false, index)
      }, 500)
    },
    play(type) {
      this.hidePlayer()
      setTimeout(()=> {
        this.playPlaylist(type==='shuffle',  0)
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
.playlist {
  width: 100%;
  height: 100%;
  position: relative;
  &__wr {
    box-sizing: border-box;
    top: 83px;
    opacity: 0;
    position: absolute;
    border-radius: 20px 20px 0px 0px;
    background: #ffffff;
    width: 100%;
    height: 761px;
    transform: translateY(780px);
    transition: all 0.3s ease;

    &.active {
      transform: translateY(0);
      opacity: 1;
    }

    .cover {
      border-radius: 20px 20px 0px 0px;
      width: 100%;
      box-sizing: border-box;
      height: 390px;
      background-color: #3DACFF;

      &__wr {
        border-radius: 20px 20px 0px 0px;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        backdrop-filter: brightness(0.6);
      }

      .add {
        position: absolute;
        transition: opacity 0.3s ease;
        cursor: pointer;
        top: 30px;
        right: 30px;
        &:hover {
            opacity: 0.7;
          }

          &:active {
            opacity: 0.5;
          }
      }

      .btns {
        position: absolute;
        display: flex;
        justify-content: space-around;
        width: calc(100% - 40px);
        top: 35%;

        .play, .shuffle {
          cursor: pointer;
          transition: opacity 0.3s ease;

          &.active {
            opacity: 0.3;
          }

          &:hover {
            opacity: 0.7;
          }

          &:active {
            opacity: 0.5;
          }
        }
      }

      .label {
        font-weight: 600;
        font-size: 32px;
        line-height: 50px;
        text-align: center;
        color: #FFFFFF;
      }

      .text {
        text-align: center;
        opacity: 0.5;
        color: #FFFFFF;
      }
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 20px 0;
      overflow-y: scroll;
      height: 268px;

      &.with-player {
        height: 200px;
      }
    }
  }
}
</style>