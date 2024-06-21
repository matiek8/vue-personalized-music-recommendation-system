<template lang="pug">
transition(name="fade-slide")
  .footer(v-show="show" id="footerId")
    transition(name="fade" mode="out-in")
      .auth(v-if="stage==='start'" )
        .auth__label Let’s Get Started
        .auth__text We will help you to find your music according to your mood and environment.
        .auth__bottom
          .btn(@click="goToSignIn")
            .label Start
            .arrow
              svg(xmlns="http://www.w3.org/2000/svg" width="39" height="16" viewBox="0 0 39 16" fill="none")
                path(d="M38.0434 8.70711C38.4339 8.31658 38.4339 7.68342 38.0434 7.29289L31.6795 0.928932C31.2889 0.538408 30.6558 0.538408 30.2652 0.928932C29.8747 1.31946 29.8747 1.95262 30.2652 2.34315L35.9221 8L30.2652 13.6569C29.8747 14.0474 29.8747 14.6805 30.2652 15.0711C30.6558 15.4616 31.2889 15.4616 31.6795 15.0711L38.0434 8.70711ZM0 9L37.3363 9V7L0 7L0 9Z" fill="#D8C3C5")
      .general(v-else-if="stage==='general'")
        .home.item(:class="{'active': computedActiveSection === 'main'}" @click="goTo('main')")
          svg(width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M35.6667 32.5833V14.875C35.6667 14.5516 35.5914 14.2326 35.4467 13.9433C35.3021 13.654 35.0921 13.4024 34.8333 13.2083L20.25 2.27084C19.8894 2.00038 19.4508 1.85417 19 1.85417C18.5492 1.85417 18.1106 2.00038 17.75 2.27084L3.16668 13.2083C2.90794 13.4024 2.69793 13.654 2.55329 13.9433C2.40865 14.2326 2.33334 14.5516 2.33334 14.875V32.5833C2.33334 33.1359 2.55284 33.6658 2.94354 34.0565C3.33424 34.4472 3.86414 34.6667 4.41668 34.6667H12.75C13.3025 34.6667 13.8324 34.4472 14.2231 34.0565C14.6138 33.6658 14.8333 33.1359 14.8333 32.5833V26.3333C14.8333 25.7808 15.0528 25.2509 15.4435 24.8602C15.8342 24.4695 16.3641 24.25 16.9167 24.25H21.0833C21.6359 24.25 22.1658 24.4695 22.5565 24.8602C22.9472 25.2509 23.1667 25.7808 23.1667 26.3333V32.5833C23.1667 33.1359 23.3862 33.6658 23.7769 34.0565C24.1676 34.4472 24.6975 34.6667 25.25 34.6667H33.5833C34.1359 34.6667 34.6658 34.4472 35.0565 34.0565C35.4472 33.6658 35.6667 33.1359 35.6667 32.5833Z" stroke="#D8C3C5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round")
        //.search.item(:class="{'active': computedActiveSection === 'search'}" @click="goTo('search')")
        //  svg(xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none")
        //    path(d="M35.1562 35.1562L44.5312 44.5312" stroke="#D8C3C5" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round")
        //    path(d="M23.4375 38.2812C31.6355 38.2812 38.2812 31.6355 38.2812 23.4375C38.2812 15.2395 31.6355 8.59375 23.4375 8.59375C15.2395 8.59375 8.59375 15.2395 8.59375 23.4375C8.59375 31.6355 15.2395 38.2812 23.4375 38.2812Z" stroke="#D8C3C5" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round")
        .library.item(:class="{'active': computedActiveSection === 'library'}" @click="goTo('library')")
          svg(xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none")
            path(d="M8.33332 6.25H10.4167C12.6125 6.25 14.4125 7.95 14.5729 10.1042L14.5833 10.4167V39.5833C14.5826 40.634 14.1852 41.6457 13.4706 42.416C12.756 43.1862 11.7769 43.6582 10.7292 43.7375L10.4167 43.75H8.33332C7.28226 43.7498 6.27005 43.3527 5.49936 42.638C4.72867 41.9233 4.25639 40.9439 4.17707 39.8958L4.16666 39.5833V10.4167C4.16666 8.22083 5.86666 6.42083 8.02082 6.26042L8.33332 6.25ZM20.8333 6.25H22.9167C25.1125 6.25 26.9125 7.95 27.0729 10.1042L27.0833 10.4167V39.5833C27.0826 40.634 26.6852 41.6457 25.9706 42.416C25.256 43.1862 24.2769 43.6582 23.2292 43.7375L22.9167 43.75H20.8333C19.7823 43.7498 18.7701 43.3527 17.9994 42.638C17.2287 41.9233 16.7564 40.9439 16.6771 39.8958L16.6667 39.5833V10.4167C16.6667 8.22083 18.3667 6.42083 20.5208 6.26042L20.8333 6.25ZM35.3625 10.4167C37.1125 10.4167 38.7125 11.5229 39.3 13.2208L39.3979 13.5479L45.6792 38.0167C45.9406 39.0347 45.8077 40.114 45.307 41.0381C44.8063 41.9623 43.9748 42.6631 42.9792 43L42.6792 43.0896L40.6604 43.6062C39.6471 43.8651 38.5735 43.7337 37.6524 43.2383C36.7314 42.7428 36.03 41.9194 35.6875 40.9312L35.5896 40.6083L29.3062 16.1396C29.045 15.121 29.1785 14.0413 29.68 13.1171C30.1816 12.1928 31.014 11.4924 32.0104 11.1562L32.3083 11.0667L34.325 10.55C34.6638 10.4619 35.0124 10.4171 35.3625 10.4167ZM10.4167 9.375H8.33332C8.08963 9.37532 7.85373 9.46091 7.66652 9.61692C7.47931 9.77293 7.35259 9.98953 7.30832 10.2292L7.29166 10.4167V39.5833C7.29166 40.0917 7.66041 40.5208 8.14582 40.6083L8.33332 40.625H10.4167C10.9271 40.625 11.3542 40.2542 11.4417 39.7708L11.4583 39.5833V10.4167C11.458 10.173 11.3724 9.93707 11.2164 9.74986C11.0604 9.56265 10.8438 9.43593 10.6042 9.39167L10.4167 9.375ZM22.9167 9.375H20.8333C20.5896 9.37532 20.3537 9.46091 20.1665 9.61692C19.9793 9.77293 19.8526 9.98953 19.8083 10.2292L19.7917 10.4167V39.5833C19.7917 40.0917 20.1604 40.5208 20.6458 40.6083L20.8333 40.625H22.9167C23.4271 40.625 23.8542 40.2542 23.9417 39.7708L23.9583 39.5833V10.4167C23.958 10.173 23.8724 9.93707 23.7164 9.74986C23.5604 9.56265 23.3438 9.43593 23.1042 9.39167L22.9167 9.375ZM35.3646 13.5417L35.2333 13.55L35.1021 13.5771L33.0854 14.0917C32.8518 14.1503 32.6459 14.2884 32.503 14.4823C32.36 14.6761 32.289 14.9137 32.3021 15.1542L32.3333 15.3625L38.6167 39.8312C38.6743 40.0545 38.8043 40.2523 38.9864 40.3936C39.1685 40.535 39.3924 40.612 39.6229 40.6125L39.7542 40.6062L39.8833 40.5812L41.9042 40.0604C42.1399 39.9997 42.347 39.8582 42.4893 39.6607C42.6316 39.4632 42.7003 39.222 42.6833 38.9792L42.6521 38.7958L36.3708 14.3229C36.3129 14.0999 36.1827 13.9023 36.0007 13.761C35.8187 13.6196 35.595 13.5425 35.3646 13.5417Z" fill="#D8C3C5")
        .account.item(:class="{'active': computedActiveSection === 'account'}"  @click="goTo('account')")
          svg(width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg")
            g(id="gg:profile")
              g(id="Group")
                path(id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M26.6668 15C26.6668 16.7682 25.9645 18.4638 24.7142 19.7141C23.464 20.9643 21.7683 21.6667 20.0002 21.6667C18.2321 21.6667 16.5364 20.9643 15.2861 19.7141C14.0359 18.4638 13.3335 16.7682 13.3335 15C13.3335 13.2319 14.0359 11.5362 15.2861 10.286C16.5364 9.03575 18.2321 8.33337 20.0002 8.33337C21.7683 8.33337 23.464 9.03575 24.7142 10.286C25.9645 11.5362 26.6668 13.2319 26.6668 15ZM23.3335 15C23.3335 15.8841 22.9823 16.7319 22.3572 17.3571C21.7321 17.9822 20.8842 18.3334 20.0002 18.3334C19.1161 18.3334 18.2683 17.9822 17.6431 17.3571C17.018 16.7319 16.6668 15.8841 16.6668 15C16.6668 14.116 17.018 13.2681 17.6431 12.643C18.2683 12.0179 19.1161 11.6667 20.0002 11.6667C20.8842 11.6667 21.7321 12.0179 22.3572 12.643C22.9823 13.2681 23.3335 14.116 23.3335 15Z" fill="black")
                path(id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M20.0001 1.66669C9.87508 1.66669 1.66675 9.87502 1.66675 20C1.66675 30.125 9.87508 38.3334 20.0001 38.3334C30.1251 38.3334 38.3334 30.125 38.3334 20C38.3334 9.87502 30.1251 1.66669 20.0001 1.66669ZM5.00008 20C5.00008 23.4834 6.18841 26.69 8.18008 29.2367C9.5788 27.3999 11.3832 25.9113 13.4525 24.8872C15.5217 23.8631 17.7997 23.3313 20.1084 23.3334C22.3873 23.3312 24.6366 23.8492 26.685 24.848C28.7333 25.8468 30.5267 27.2999 31.9284 29.0967C33.3725 27.2027 34.3448 24.992 34.7649 22.6477C35.185 20.3033 35.0408 17.8926 34.3442 15.615C33.6477 13.3374 32.4188 11.2584 30.7592 9.55008C29.0997 7.84173 27.0572 6.55312 24.8007 5.79087C22.5443 5.02862 20.1387 4.81464 17.7832 5.16664C15.4276 5.51864 13.1897 6.42651 11.2547 7.81511C9.31966 9.20371 7.7431 11.0331 6.65546 13.152C5.56783 15.2709 5.00038 17.6183 5.00008 20ZM20.0001 35C16.5567 35.0052 13.2172 33.8206 10.5467 31.6467C11.6216 30.1079 13.0523 28.8515 14.7171 27.9845C16.3818 27.1174 18.2314 26.6653 20.1084 26.6667C21.962 26.6652 23.7892 27.106 25.4383 27.9524C27.0874 28.7988 28.5107 30.0264 29.5901 31.5334C26.8989 33.7779 23.5044 35.0049 20.0001 35Z" fill="black")
</template>

<script>
export default {
  name: 'app-footer',
  data() {
    return {
      show: false,
      stage: ''
    }
  },
  computed: {
    computedActiveSection() {
      return this.$route.name
    }
  },
  watch: {
    $route(to) {
      this.show = true
      this.update(to.name)
    }
  },
  beforeUnmount() {
    this.show =false
  },
  methods: {
    update(pageName) {
      const footer = document.getElementById('footerId')
      if (['signin', 'signup'].includes(pageName)) {
        this.stage = ''
        footer.style.height = '80px'
      } else if (pageName === 'auth') {
        this.stage = 'start'
        footer.style.height = '320px'
      } else {
        this.stage = 'general'
        footer.style.height = '80px'
      }
    },
    goTo(pathName) {
      this.$router.push({name: pathName})
    },
    goToSignIn() {
      this.$router.push({name: 'signin'})
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  position: absolute;
  bottom: 0;

  background-color: var(--bg-footer);
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  min-height: 80px;
  transition: all 0.3s ease;

  @media (max-width: 480px) and (max-height: 900px) {
    position: fixed;
  }

  .auth {
    padding: 20px;
    color: #D8C3C5;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    gap: 30px;

    &__label {
      width: 80%;
      font-size: 40px;
      font-weight: 600;
    }

    &__text {
      width: 90%;
      font-size: 20px;
      font-weight: 400;
    }

    &__bottom {
      display: flex;
      justify-content: flex-end;

      .btn {
        cursor: pointer;
        display: flex;
        gap: 10px;
        font-size: 25px;
        font-style: normal;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
          opacity: 0.8;
        }

        &:active {
          opacity: 0.6;
        }
      }
    }
  }

  .general {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item {
      cursor: pointer;
    }

    .library, .account {
      path {
        transition: all 0.3s ease;
        fill: #D8C3C5;
      }

      &:hover:not(.active) {
        path {
          fill: #a9fac9;
        }
      }

      &:active:not(.active) {
        path {
          fill: #60fa9d;
        }
      }

      &.active {
        path {
          fill: #60FF9F;
        }
      }
    }
    .search, .home {
      path {
        transition: all 0.3s ease;
        stroke: #D8C3C5;
      }

      &:hover:not(.active) {
        path {
          stroke: #a9fac9;
        }
      }

      &:active:not(.active) {
        path {
          stroke: #60FF9F;
        }
      }

      &.active {
        path {
          stroke: #60FF9F;
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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