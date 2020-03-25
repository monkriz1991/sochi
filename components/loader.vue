<template lang="pug">
  div.loader
</template>

<script>
  export default {
    name: "loader"
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
</style>
