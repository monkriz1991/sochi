<template lang="pug">
  div#app
    div#app-header
      h-component-restyle
    div#main
      nuxt
    div#app-footer
      FComponent
</template>

<script>
  import HComponent from "./partials/HComponent";
  import FComponent from "./partials/FComponent";
  import HComponentRestyle from "@/layouts/partials/HComponentRestyle";
  export default {
    name: 'MAIN',
    components: {
      HComponentRestyle,
      HComponent,
      FComponent,
    },
    data(){
      return {
        set_data: false
      }
    },
    mounted() {
      if (!localStorage.partner) {
        if (this.$route.query.partner) {
          localStorage.partner = this.$route.query.partner;
        } else {
          console.log('ref not presented')
        }
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

