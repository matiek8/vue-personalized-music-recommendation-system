<template lang="pug">
.search
  .search__wr(:class="{'active': searchIsActive}")
    .input
      InputComponent(
        v-model="search"
        placeholder="Search"
      )
    .list
      .block(v-for="item in results" @click="openPlaylist")
        .name {{item.name}}
</template>

<script>
import InputComponent from '@/components/partials/input-component.vue'
export default {
  name: 'SearchPage',
  components: {InputComponent},
  data() {
    return {
      search: '',
      searchIsActive: false,
      results: [{name: 'Test Playlist'}, {name: 'Test Playlist'}, {name: 'Test Playlist'}, {name: 'Test Playlist'}, {name: 'Test Playlist'}, {name: 'Test Playlist'}, {name: 'Test Playlist'}]
    }
  },
  mounted() {
    setTimeout(()=>{
      this.searchIsActive = true
    }, 10)
  },
  methods: {
    openPlaylist() {
      this.$router.push({name:'playlist'})
    }
  }
}
</script>

<style scoped lang="scss">
.search {
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

    .list {
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;

      .block {
        cursor: pointer;
        height: 50px;
        background-color: #b4b4b4;
        border-radius: 10px;
        padding: 10px;
        transition: all 0.3s ease;
        &:hover {
          opacity: 0.85;
        }

        &:active {
          opacity: 0.7;
        }
      }
    }

  }
}
</style>