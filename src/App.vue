<template lang="pug">
main.main(:class="computedModeClass")
  .main__head
    AppHead
  .main__body(id="main-body" ref="main")
    router-view(v-slot="{ Component }")
      transition(name="fade" mode="out-in")
        component(:is="Component")
  .main__player(v-if="computedShowPlayer" )
    PlayerComponent
  .main__footer
    AppFooter
</template>

<script>
import AppFooter       from '@/components/partials/app-footer.vue'
import AppHead         from '@/components/partials/app-head.vue'
import PlayerComponent from '@/components/partials/player.vue'
import {useUserStore}  from '@/stores/user'
import {mapState}      from 'pinia'

export default {
  name: 'App',
  components: {PlayerComponent, AppFooter, AppHead},
  computed: {
    ...mapState(useUserStore, ['isAuth']),
    computedModeClass() {
      let classes = this.$route.name === 'auth' ? 'auth' : ''
      return classes
    },
    computedShowPlayer() {
      return this.isAuth && !['auth', 'signin', 'signup'].includes(this.$route.name)
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 844px;
  margin: 0 auto;
  background-color: #D8C3C5;
  overflow-x: hidden;

  @media (max-width: 480px) {
    width: 100%;
    min-height: 600px;
    height: 100vh;
    max-height: 900px;
  }

  &::-webkit-scrollbar {
    display: none;
  }


  &.is-web {
    border-radius: 16px;
  }

  &__head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: 10;
  }

  &__body {
    display: grid;
    grid-template: 'main';
    height: 100%;

    > * {
      position: relative;
      grid-area: main;
    }

    > :first-child {
      z-index: 2;
    }
  }

  &__footer {
    z-index: 100;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
