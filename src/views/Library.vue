<template lang="pug">
.library
  .library__wr(:class="{'active': libIsActive}")
    .title Saved playlists
    .list(v-if="addedPlaylists.length" )
      .block(v-for="item in addedPlaylists" @click="openPlaylist(item)")
        .name {{item.playlistTitle}}
    .msg(v-else) No playlist added...
</template>

<script>
import {useUserStore}         from '@/stores/user'
import {mapActions, mapState} from 'pinia'

export default {
  name: 'LibraryPage',
  data() {
    return {
      libIsActive: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['addedPlaylists']),
  },
  mounted() {

    setTimeout(()=>{
      this.libIsActive = true
    }, 10)
  },
  methods: {
    ...mapActions(useUserStore, ['selectPlaylist']),
    openPlaylist(playlist) {
      this.selectPlaylist(playlist)
      this.$router.push({name:'playlist'})
    }
  }
}
</script>

<style scoped lang="scss">
.library {
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
    background: #ffffff;
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

    .list {
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;

      .block {
        cursor: pointer;
        height: 50px;
        background: linear-gradient(131deg, rgba(138, 255, 150, 0.70) 4.36%, rgba(62, 137, 255, 0.70) 100%);
        border-radius: 10px;
        padding: 10px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        font-weight: 600;
        &:hover {
          opacity: 0.85;
        }

        &:active {
          opacity: 0.7;
        }
      }
    }
  }
  .msg {
    padding-top: 20px;
    opacity: 0.3;
  }
}
</style>