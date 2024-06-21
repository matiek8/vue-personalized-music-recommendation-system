<template lang="pug">
.home
  .home__wr(:class="{'active': homeIsActive}")
    .title {{computedTitle}}
    .mood
      .sub-title How are you?
        span.comment Max 3 words
      .slider
        .emoji-display
          span.light(@click="moodScale=0") 😔
          input(type="range" min="1" max="100" v-model="moodScale")
          span.fire(@click="moodScale=100") 😄
      .tags
        .tag(v-for="mood in moods" :key="mood" :class="{ active: selectedMoods.includes(mood) }" @click="selectMood(mood)")
          | {{ mood }}
    .intensity
      .sub-title Playlist Intensity
      .slider
        .emoji-display
          span.light(@click="intensity=0") 💡
          input(type="range" min="1" max="100" v-model="intensity")
          span.fire(@click="intensity=100") 🔥
    .btn(@click="goToPlaylist" :class="{'loading':loading, 'with-player':showPlayer }")
      .label Generate playlist
      svg(xmlns="http://www.w3.org/2000/svg" width="31" height="16" viewBox="0 0 31 16" fill="none")
        path(d="M30.7071 8.70711C31.0976 8.31658 31.0976 7.68342 30.7071 7.29289L24.3431 0.928932C23.9526 0.538408 23.3195 0.538408 22.9289 0.928932C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 9H30V7H0L0 9Z" fill="black")
</template>

<script>
import {getAccessToken}       from '@/services/SpotifyService'
import {useUserStore}         from '@/stores/user'
import {mapActions, mapState} from 'pinia'

export default {
  name: 'MainPage',
  data() {
    return {
      loading: false,
      homeIsActive: false,
      moodScale: 50,
      moods: ["Happy", "Sad", "Energetic", "Calm", "Angry", "Relaxed", "Romantic", "Melancholic", "Motivated", "Tired", "Excited", "Stressed", "Peaceful", "Bored", "Nostalgic", "Inspired"], // Add more moods as needed
      selectedMoods: [],
      intensity: 50,
      spotifyPlaylists: null
    }
  },
  computed: {
    ...mapState(useUserStore, ['name', 'showPlayer']),
    computedTitle() {
      const now = new Date()
      const hour = now.getHours()

      if (hour < 6) {
        return `Good night, ${this.name}`
      } else if (hour < 12) {
        return `Good morning, ${this.name}`
      } else if (hour < 18) {
        return `Good afternoon, ${this.name}`
      } else {
        return `Good evening, ${this.name}`
      }
    }
  },
  async mounted() {
    this.getSpotifyAccessToken();
    let token = getAccessToken()

    setTimeout(()=>{
      this.homeIsActive = true
    }, 10)
  },
  beforeUnmount() {
    this.homeIsActive = false
  },
  methods: {
    ...mapActions(useUserStore, ['generateOpenAiPlaylist', 'getSpotifyAccessToken']),
    async goToPlaylist() {
      this.loading = true
      await this.getPlaylistRecommendation()
      this.$router.push({name:'playlist'})
      this.loading = false
    },
    async getPlaylistRecommendation() {
      try {
        await this.generateOpenAiPlaylist(this.selectedMoods, this.moodScale, this.intensity)
      } catch (error) {
        console.error('Error in getting playlist recommendation:', error);
      }
    },
    selectMood(mood) {
      if (this.selectedMoods.includes(mood)) {
        this.selectedMoods = this.selectedMoods.filter(m => m !== mood);
      } else if (this.selectedMoods.length < 3) {
        this.selectedMoods.push(mood);
      }
    },
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: relative;
  &__wr {
    box-sizing: border-box;
    padding: 30px 20px;
    top: 83px;
    opacity: 0;
    position: absolute;
    border-radius: 20px 20px 0px 0px;
    background: #FFF;
    width: 100%;
    height: 761px;
    transform: translateY(780px);
    transition: all 0.3s ease;

    &.active {
      transform: translateY(0);
      opacity: 1;
    }

    .title {
      font-weight: 600;
      font-size: 25px;
      line-height: 50px;
    }

    .mood {
      margin-top: 20px;
      .sub-title {
        font-size: 20px;
        font-weight: 500;
        line-height: 25px;
      }
      .comment {
        margin-left: 10px;
        font-size: 15px;
        font-weight: 400;
        opacity: 0.3;
      }

      .tags {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .tag {
          cursor: pointer;
          padding: 1px 15px;
          border-radius: 10px;
          background: #D9E2F0;
          font-size: 14px;
          color: black;
          transition: all 0.3s ease;

          &:hover {
            opacity: 0.8;
          }

          &:active {
            opacity: 0.6;
          }

          &.active {
            color: white;
            background: #CD6E64;
          }
        }
      }
    }

    .intensity {
      margin-top: 20px;

      .sub-title {
        font-size: 20px;
        font-weight: 500;
        line-height: 25px;
      }
    }

    .btn {
      position: absolute;
      bottom: 100px;
      width: calc(100% - 40px);
      cursor: pointer;
      font-size: 25px;
      font-weight: 600;
      line-height: 50px;
      border-radius: 40px;
      background: #D9E2F0;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 25px;
      transition: all 0.3s;

      &.with-player {
        bottom: 180px;
      }

      &:hover {
        opacity: 0.85;
      }

      &:active {
        opacity: 0.7;
      }

      .label, svg {
        opacity: 1;
        transition: opacity 0.3s ease;
      }

      &.loading {
        .label, svg {
          opacity: 0;
        }

        &:after {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          border: 4px solid transparent;
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: button-loading-spinner 1s ease infinite;
      }
      }
    }
  }
}

.slider {
  margin-top: 20px;

  .value-display {
    margin-top: 10px;
    font-size: 14px;
    opacity: 0.4;
  }

  .emoji-display {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      font-size: 24px;
    }

    input[type="range"] {
      flex-grow: 1;
      margin: 0 10px;
      cursor: pointer;

      input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        margin: 10px 0;
        background: transparent;

        &:focus {
          outline: none;
        }

        // Slider Track
        &::-webkit-slider-runnable-track {
          background: white;
          border: none;
          border-radius: 6px;
          height: 10px;
        }

        &::-moz-range-track {
          background: white;
          border: none;
          border-radius: 6px;
          height: 10px;
        }

        // Slider Thumb
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          border: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #60FF9F;
          margin-top: -5px;
          cursor: pointer;
        }

        &::-moz-range-thumb {
          border: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #60FF9F;
          cursor: pointer;
        }
      }
    }
  }
}

@keyframes button-loading-spinner {
  from {
      transform: rotate(0turn);
  }

  to {
      transform: rotate(1turn);
  }
}
</style>