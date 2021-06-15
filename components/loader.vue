<template lang="pug">
  div
    div(v-if="text")
      div.loader-small
      p.text-center="Идет поиск{{dots}}"
    div(v-else)
      div.loader
</template>

<script>
export default {
  name: "loader",
  props: ["text"],
  data(){
    return {
      dots: '',
      step: 1,
    }
  },
  mounted() {
    setInterval(() => {
      if (this.step === 1){
        this.step++
        this.dots = '.'
      }else if (this.step === 2){
        this.step++
        this.dots = '..'
      }else{
        this.step = 1
        this.dots = '...'
      }
    }, 750)
  }
}
</script>

<style lang="sass" scoped>
.loader
  border-radius: 50%
  width: 120px
  height: 120px
  animation: spin 2s linear infinite
  margin: 10px auto
  background-image: url("../assets/images/loader2.png")
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  @keyframes spin
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
.loader-small
  border-radius: 50%
  width: 60px
  height: 60px
  animation: spin 2s linear infinite
  margin: 10px auto
  background-image: url("../assets/images/loader2.png")
  background-position: center
  background-repeat: no-repeat
  background-size: contain
  @keyframes spin
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>
