<template lang="pug">
    div.item-card.p-2.w-100.h-100
      div.price-badge
        span(v-if="item.Price > item.PriceDiscount").old="{{item.Price}}руб./сутки"
        span="{{item.PriceDiscount}}руб./сутки"
      div.item-header
        div.media
          div.preview(:lazy-background="item.img")
            div.item-color(v-bind:style="{backgroundColor: item.WebColor}")
        div.media-info.px-2.pt-4.text-center
          h3.m-0="{{item.naimenovanie}}"
          div.divider
        div.item-features.px-1
          span(v-for="(f, fdx) in item.features_options" :key="fdx" v-bind:class="$assets.fetchFeatureClass(f.name)")="{{f.name}}"
      div(v-if="item.naimenovanie === 'Xiaomi MiJia Electric Scooter M365'").item-content
        div.info_lap
          p.l="Год выпуска:"
          p.r="{{item.godvypuska}}"
        div.info_lap
          p.l="Нагрузка:"
          p.r="100кг"
        div.info_lap
          p.l="Запас хода:"
          p.r="30км"
        div.info_lap
          p.l="Мощность:"
          p.r="250 Вт"
        div.info_lap
          p.l="Макс. скорость:"
          p.r="25 км/ч"
      div(v-else).item-content
        div.info_lap
          p.l="Год выпуска:"
          p.r="{{item.godvypuska}}"
        div.info_lap
          p.l="КПП:"
          p.r="{{item.kpp}}"
        div.info_lap
          p.l="Топливо:"
          p.r="{{item.toplivo}}"
        div.info_lap
          p.l="Двигатель:"
          p.r(v-html="`${item.dvigatel.toFixed(1)}л.`")
        div.info_lap
          p.l="Цвет:"
          p.r="{{item.cvet}}"
      div.item-action
        nuxt-link(:to="makeLink(item.ID)")="ПОДРОБНЕЕ"
</template>

<script>
  export default {
    name: "autoOfferCard",
    data(){
      return {

      }
    },
    props:{
      item: {
        type: Object,
        required: true
      }
    },
    methods:{
      makeLink($slug){
        return `/booking-online/${$slug}`
      }
    },
    mounted() {}
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .item-card
    border: 1px solid rgba(205,205,205,0.5)
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    cursor: pointer
    transition: 0.3s
    position: relative
    &:hover
      -webkit-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
      box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
    .price-badge
      span
        display: block
        &.old
          color: #ECECEC
          font-size: 12px
          text-decoration: line-through
          float: right
      color: #ffffff
      background-color: $primary
      padding: 5px 10px
      position: absolute
      top: -10px
      right: -15px
      border-radius: 15px 0 15px 0
      -webkit-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
      box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
    .item-header
      display: flex
      justify-content: space-between
      align-items: center
      flex-direction: row
      flex-wrap: wrap
    .media
      width: 40%
      .preview
        height: 120px
        width: 100%
        background-repeat: no-repeat
        background-size: contain
        background-position: center
        align-items: center
        position: relative
      .item-color
        position: absolute
        bottom: 15px
        right: 0
        width: 20px
        height: 20px
        border: 1px solid rgba(205,205,205,0.5)
        -webkit-box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.4)
        -moz-box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.4)
        box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.4)
        border-radius: 25px
    .media-info
      width: 60%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      h3
        text-transform: uppercase
        font-size: 18px
      .divider
        width: 90%
        height: 3px
        margin: 3px auto
        background-color: $primary_hover
    .item-features
      width: 100%
      min-height: 55px
      span
        display: inline-block
        padding: 2px 5px
        text-transform: uppercase
        font-size: 12px
        border-radius: 3px
        color: #ffffff
        margin: 2px
    .item-content
      padding: 0 10px
      .info_lap
        margin-bottom: 2px
        &:after
          content: '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'
          display: block
          white-space: nowrap
          overflow: hidden
        .l
          font-weight: bold
          float: left
          padding-right: 5px
          margin: 0
        .r
          float: right
          padding-left: 5px
          margin: 0
    .item-action
      display: flex
      justify-content: center
      align-items: center
      a
        background-color: $primary
        font-family: 'Roboto Condensed', sans-serif
        color: #ffffff
        font-size: 16px
        text-align: center
        padding: 5px 25px
        transition: 0.3s
        border-radius: 0.25rem
        &:hover
          background-color: $primary_hover
</style>
