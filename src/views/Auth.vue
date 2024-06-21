<template lang="pug">
transition(name="fade")
  .auth(v-if="show")
    .figure
      .v-line
      .h-line
</template>

<script>
export default {
  name: 'AuthPage',
  data(){
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  },
  beforeUnmount() {
    this.show = false
  }
}
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  justify-content: center;

  .figure {
    margin-top: 180px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    position: relative;
    background-color: #CD6E64;

    .v-line {
      position: absolute;
      top: 90px;
      left: 108px;
      width: 4px;
      height: 40px;
      background-color: #000000;
    }

    .h-line {
      position: absolute;
      left: 90px;
      top: 108px;
      height:4px;
      width: 40px;
      background-color: #000000;
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