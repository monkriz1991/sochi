<template lang="pug">
    section#banners.my-5
      b-container
        b-row
          b-col(sm="12" md="6" lg="6")
            nuxt-link(:to="{name: $assets.prefix('long_term_rental', $i18n.locale)}").nodec
              div(:lazy-background="longterm").acia.longterm.d-flex.justify-content-center.align-items-center.my-2
                h2.text-uppercase="{{$t('s4')}}"
          b-col(sm="12" md="6" lg="6")
            nuxt-link(:to="{name: $assets.prefix('about-discounts', $i18n.locale)}").nodec
              div(:lazy-background="actia").acia.actia.d-flex.justify-content-center.align-items-center.my-2
                h2.text-uppercase="{{$t('s5')}}"
</template>

<script>
  export default {
    name: "BannersSection",
    data(){
      return {
        longterm: require("../assets/images/long_term-min.jpg"),
        actia: require("../assets/images/akcia_back-min.jpg"),
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .nodec
    text-decoration: none
  .acia
    border: 1px solid $primary
    -webkit-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    box-shadow: 3px 3px 10px 0 rgba(255,106,40,0.4)
    min-height: 300px
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    border-radius: 25px
    @media screen and (max-width: 991px)
      min-height: 180px
    @media screen and (max-width: 500px)
      min-height: 200px
    @media screen and (max-width: 375px)
      min-height: 150px
    h2
      color: #ffffff
      display: inline-block
      margin: 0
      padding-bottom: 5px
      border-bottom: 5px solid $primary
      @media screen and (max-width: 991px)
        font-size: 24px
      @media screen and (max-width: 760px)
        font-size: 2rem
      @media screen and (max-width: 375px)
        font-size: 22px
</style>
