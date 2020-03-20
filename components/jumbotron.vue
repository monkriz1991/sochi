<template lang="pug">
  div.position-relative
    b-jumbotron.main_head
    div#search_form
      search-form
    div.make_clear
    div.clearfix
</template>

<script>
  import searchForm from "./searchForm";
  export default {
    name: "jumbotron",
    components: {
      searchForm,
    },
  }
</script>

<style lang="sass" scoped>
  .main_head
    min-height: 500px
    background-position: center
    background-repeat: no-repeat
    background-color: #E8EEF2
    background-image: url("../assets/images/sochi_background.jpg")
    @media screen and (max-width: 940px)
      background-size: cover
    @media screen and (max-width: 700px)
      background-image: url("../assets/images/sochi_background_meduim.jpg")
  #search_form
    position: absolute
    bottom: 20px
    width: 100%
    z-index: 2
  .make_clear
    height: 50px
</style>
