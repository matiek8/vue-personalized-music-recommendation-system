<template lang="pug">
.signin
  .title Sign In
  .form
    .email
      InputComponent(
        v-model="email"
        :error="error.email"
        placeholder="Email"
      )
    .password
      InputComponent(
        v-model="password"
        :error="error.password"
        placeholder="Password"
        type="password"
      )
    transition(name="fade" mode="out-in")
      .error {{error.text}}
  .bottom
    .label Sign In
    .arrow(@click="signIn")
      svg(xmlns="http://www.w3.org/2000/svg" width="31" height="16" viewBox="0 0 31 16" fill="none")
        path(d="M30.7071 8.70711C31.0976 8.31658 31.0976 7.68342 30.7071 7.29289L24.3431 0.928932C23.9526 0.538408 23.3195 0.538408 22.9289 0.928932C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 9H30V7H0L0 9Z" fill="black")
</template>

<script>
import InputComponent          from '@/components/partials/input-component.vue'
import {getAccessToken, login} from '@/services/SpotifyService'
import {useUserStore}          from '@/stores/user'
import {mapActions}     from 'pinia'
export default {
  name: 'SigninPage',
  components: {InputComponent},
  data() {
    return {
      email: '',
      password: '',
      error: {
        email: false,
        password: false,
        text: ''
      }
    }
  },
  watch:{
    email() {
      this.error.text = ''
    },
    password() {
      this.error.text = ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signInDb']),
    async signIn() {
      let isAuth = await this.signInDb(this.email, this.password)

      if (isAuth) {
        this.checkLogin()
      } else {
        this.error.text ='Invalid email or password'
      }
    },
    checkLogin() {
      const token = getAccessToken();
      if (token) {
        this.$router.push({name: 'main'})
      } else {
        login()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.signin {
  padding: 170px 20px 0;

  .title {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    margin-bottom: 235px;
  }

  .bottom {
    position: absolute;
    bottom: 100px;
    display: flex;
    width: calc(100% - 40px);
    justify-content: space-between;
    align-items: center;

    .label {
      font-size: 32px;
      font-style: normal;
      font-weight: 600;
    }

    .arrow {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #CD6E64;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-radius: 50%;
        background-color:rgba(205, 110, 100, 0.7)
      }

      &:active {
        border-radius: 50%;
        background-color:rgba(205, 110, 100, 0.5)
      }
    }
  }
}

.error {
  opacity: 0.5;
  font-size: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>