<template lang="pug">
.edit
  .title Edit account
  .form
    .name
      InputComponent(
        v-model="newName"
        :error="error.name"
        placeholder="Name"
      )
    .email
      InputComponent(
        v-model="newEmail"
        :error="error.email"
        placeholder="Email"
      )
    .password
      InputComponent(
        v-model="newPassword"
        :error="error.password"
        placeholder="Password"
        type="password"
      )
  .bottom(:class="{'with-player':showPlayer}")
    .label Save
    .arrow(@click="saveInfo")
      svg(xmlns="http://www.w3.org/2000/svg" width="31" height="16" viewBox="0 0 31 16" fill="none")
        path(d="M30.7071 8.70711C31.0976 8.31658 31.0976 7.68342 30.7071 7.29289L24.3431 0.928932C23.9526 0.538408 23.3195 0.538408 22.9289 0.928932C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 9H30V7H0L0 9Z" fill="black")
</template>

<script>
import InputComponent from '@/components/partials/input-component.vue'
import {useUserStore}         from '@/stores/user'
import {mapActions, mapState} from 'pinia'
export default {
  name: 'EditAccountPage',
  components: {InputComponent},
  data() {
    return {
      newName: '',
      newEmail: '',
      newPassword: '',
      error: {
        name: false,
        email: false,
        password: false
      }
    }
  },
   computed: {
    ...mapState(useUserStore, ['showPlayer','name', 'email', 'password']),
  },
  mounted() {
    this.newEmail = this.email
    this.newName = this.name
    this.newPassword = this.password
  },
  methods: {
    ...mapActions(useUserStore, ['editAccountDb']),
    async saveInfo() {
      await this.editAccountDb(this.newEmail, this.newPassword, this.newName)
      this.$router.push({name: 'account'})
    }
  }
}
</script>

<style scoped lang="scss">
.edit {
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

    &.with-player {
      margin-bottom: 125px;
    }
  }

  .bottom {
    position: absolute;
    bottom: 100px;
    display: flex;
    width: calc(100% - 40px);
    justify-content: space-between;
    align-items: center;
    &.with-player {
      bottom: 180px;
    }

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
        background-color:rgba(205, 110, 100, 0.7)
      }

      &:active {
        background-color:rgba(205, 110, 100, 0.5)
      }
    }
  }
}
</style>