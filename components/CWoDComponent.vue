<template lang="pug">
    div.cwod-wrapper
      b-row
        b-col(sm="6" md="6" lg="6" v-for="(i, idx) in items" :key="idx")
          nuxt-link(:to="{name: $assets.prefix('rent-car_slug', $i18n.locale), params: {car_slug: i.slug}}").no_dec
            div.el-wrapper.my-3
              div.price-badge(v-html="`${$t('cwd27')} ${$assets.toMoney($assets.makeItemPrice(i.car_data.stoimost, i.car_data.skidka_2, i.car_data.special_price))}₽/${$t('cwod7')}`")
              div.main-img(:lazy-background="`https://booking.autopilot.rent/${i.self_data.photos[0]}`")
              div.flox-img(:lazy-background="`https://booking.autopilot.rent/${i.self_data.photos[1]}`")
              div.flox-img(:lazy-background="`https://booking.autopilot.rent/${i.self_data.photos[2]}`")
              div.bch.p-2
                h5.text-center="{{i.self_data.title}}"
</template>

<script>
  export default {
    name: "CWoDComponent",
    props:{
      items: {
        type: Array
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .bch
    background-color: $primary
    width: 100%
    border: 1px solid rgba(205,205,205,0.5)
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    @media screen and (max-width: 760px)
      box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4)
    display: flex
    justify-content: center
    align-items: center
    min-height: 65px
    h5
      color: #fff
      margin: 0
      font-size: 16px
  .no_dec
    color: #222222
    text-decoration: none
  .el-wrapper
    width: 100%
    position: relative
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
    .price-badge
      position: absolute
      top: 0
      right: 0
      padding: 5px 10px
      background: $primary
      color: #ffffff
      font-family: 'Roboto Condensed', sans-serif
      border: 1px solid rgba(205,205,205,0.5)
      -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      @media screen and (max-width: 760px)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4)
      &:before
        content: ''
        position: absolute
        border-top: 18px solid transparent
        border-right: 16px solid $primary
        border-bottom: 18px solid transparent
        left: -16px
        top: 0
    .main-img
      width: 100%
      height: 200px
      background-size: cover
      background-position: center
      background-repeat: no-repeat
      border: 1px solid rgba(255,255,255,1)
      -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      @media screen and (max-width: 760px)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4)
    .flox-img
      width: 50%
      height: 120px
      background-size: cover
      background-position: center
      background-repeat: no-repeat
      border: 1px solid rgba(255,255,255,1)
      -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
      @media screen and (max-width: 760px)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4)
</style>
