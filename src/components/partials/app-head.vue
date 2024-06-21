<template lang="pug">
.app-head
  .left
    .logo(@click="goTo('main')")
      svg(width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg")
        rect(x="2" y="2" width="40" height="40" fill="#0A182E")
        rect(x="0.715698" y="22" width="30" height="30" transform="rotate(-45 0.715698 22)" fill="#D8C3C5")
  .right
    transition(name="fade"  mode="out-in")
      .signin-btn(v-if="signName==='signin'" @click="goTo('signin')") Sign In
      .signup-btn(v-else-if="signName==='signup'" @click="goTo('signup')") Sign Up
      //.account(v-else-if="signName==='account'" @click="goTo('account')")
        svg(width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg")
          g(id="gg:profile")
            g(id="Group")
              path(id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M26.6668 15C26.6668 16.7682 25.9645 18.4638 24.7142 19.7141C23.464 20.9643 21.7683 21.6667 20.0002 21.6667C18.2321 21.6667 16.5364 20.9643 15.2861 19.7141C14.0359 18.4638 13.3335 16.7682 13.3335 15C13.3335 13.2319 14.0359 11.5362 15.2861 10.286C16.5364 9.03575 18.2321 8.33337 20.0002 8.33337C21.7683 8.33337 23.464 9.03575 24.7142 10.286C25.9645 11.5362 26.6668 13.2319 26.6668 15ZM23.3335 15C23.3335 15.8841 22.9823 16.7319 22.3572 17.3571C21.7321 17.9822 20.8842 18.3334 20.0002 18.3334C19.1161 18.3334 18.2683 17.9822 17.6431 17.3571C17.018 16.7319 16.6668 15.8841 16.6668 15C16.6668 14.116 17.018 13.2681 17.6431 12.643C18.2683 12.0179 19.1161 11.6667 20.0002 11.6667C20.8842 11.6667 21.7321 12.0179 22.3572 12.643C22.9823 13.2681 23.3335 14.116 23.3335 15Z" fill="black")
              path(id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M20.0001 1.66669C9.87508 1.66669 1.66675 9.87502 1.66675 20C1.66675 30.125 9.87508 38.3334 20.0001 38.3334C30.1251 38.3334 38.3334 30.125 38.3334 20C38.3334 9.87502 30.1251 1.66669 20.0001 1.66669ZM5.00008 20C5.00008 23.4834 6.18841 26.69 8.18008 29.2367C9.5788 27.3999 11.3832 25.9113 13.4525 24.8872C15.5217 23.8631 17.7997 23.3313 20.1084 23.3334C22.3873 23.3312 24.6366 23.8492 26.685 24.848C28.7333 25.8468 30.5267 27.2999 31.9284 29.0967C33.3725 27.2027 34.3448 24.992 34.7649 22.6477C35.185 20.3033 35.0408 17.8926 34.3442 15.615C33.6477 13.3374 32.4188 11.2584 30.7592 9.55008C29.0997 7.84173 27.0572 6.55312 24.8007 5.79087C22.5443 5.02862 20.1387 4.81464 17.7832 5.16664C15.4276 5.51864 13.1897 6.42651 11.2547 7.81511C9.31966 9.20371 7.7431 11.0331 6.65546 13.152C5.56783 15.2709 5.00038 17.6183 5.00008 20ZM20.0001 35C16.5567 35.0052 13.2172 33.8206 10.5467 31.6467C11.6216 30.1079 13.0523 28.8515 14.7171 27.9845C16.3818 27.1174 18.2314 26.6653 20.1084 26.6667C21.962 26.6652 23.7892 27.106 25.4383 27.9524C27.0874 28.7988 28.5107 30.0264 29.5901 31.5334C26.8989 33.7779 23.5044 35.0049 20.0001 35Z" fill="black")
</template>

<script>
export default {
  name: 'app-head',
  data() {
    return {
      signName: ''
    }
  },
  watch: {
    $route(to) {
      this.update(to.name)
    }
  },
  methods: {
    update(pageName) {
      if(pageName === 'signin') this.signName = 'signup'
      else if( pageName ==='signup')  this.signName = 'signin'
      else if( pageName ==='auth')  this.signName = ''
      else this.signName = 'account'
    },
    goTo(pathName) {
      if(pathName!=='main' || (pathName=='main' && !['auth', 'signin', 'signup'].includes(this.$route.name))) {
        this.$router.push({name: pathName})
      } else if (pathName=='main' && ['auth', 'signin', 'signup'].includes(this.$route.name)) {
        this.$router.push({name: 'auth'})
      }
    }
  }
}
</script>

<style scoped lang="scss">
.app-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  top: 0;
  @media (max-width: 480px) {
    width: calc(100% - 40px);
    position: fixed;
    top: 0;
  }

  .left {
    .logo {
      cursor: pointer;
      width: 40px;
      height: 40px;
      opacity: 1;
      transition: opacity 0.3s ease;
      svg {
        width: 40px;
        height: 40px;
      }

      &:hover {
        opacity: 0.7;
      }

      &:active {
        opacity: 0.5;
      }
    }
  }
  .right {
    .signin-btn, .signup-btn, .account {
      cursor: pointer;
      opacity: 1;
      transition: opacity 0.3s ease;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;

      &:hover {
        opacity: 0.7;
      }

      &:active {
        opacity: 0.5;
      }
    }

    .account {
      width: 40px;
      height: 40px;
    }
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