<template lang="pug">
  div#app
    div#app-header
      HComponent
    div#main
      nuxt
    div#app-footer
      FComponent
</template>

<script>
  import HComponent from "./partials/HComponent";
  import FComponent from "./partials/FComponent";
  export default {
    name: 'MAIN',
    components: {
      HComponent,
      FComponent,
    },
    data(){
      return {
        set_data: false
      }
    },
    beforeCreate() {
      this.$axios(`sun/fetchSettings/${this.$config.station}`)
        .then(res => {
          this.set_data = res.data.data
        }).catch(err=>console.error(err))
    }
  }
</script>
<style lang="sass">
  #app
    display: flex
    min-height: 100vh
    flex-direction: column
    #app-header, #app-footer
      flex: none
    #main
      flex: 1
</style>

