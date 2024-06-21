<template lang="pug">
.info(:class="{'active': isActive}")
  .img
    img(v-if="computedCover" :src="computedCover")
    .cover(v-else)
  .song
    .name {{song.song}}
    .artist {{song.artist}}
</template>

<script>
export default {
  name: 'song-component',
  props: {
    song: {
      type: Object,
      default: ()=>{}
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedCover() {
      if(this.song?.info?.album?.images.length) {
        let imgs = this.song?.info?.album?.images
        return imgs[imgs.length-1].url
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
.info {
  display: flex;
  transition: all 0.3s ease;
  padding: 5px 20px;
  align-items: center;
  cursor: pointer;

  &.active {
    background-color: #eaeaea;
  }

  &:hover {
    background-color: #e1e1e1;
  }

  &:active {
    background-color: #d7d7d7;
  }

  .img {
    width: 40px;
    height: 40px;
    margin-right: 20px;

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

  .name {
    text-overflow: ellipsis;
  }

  .song {
    width: 270px;
  }

  .name,.artist {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .artist {
    opacity: 0.5;
    font-size: 14px;
  }
}

</style>