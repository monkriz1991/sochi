<template lang="pug">
  div.item-card.w-100.h-100.pb-2
    div.item-header
      div.media
        div(v-if="item.Special_Price").price-badge
          span="{{item.Special_Price}}₽/{{$t('aoc1')}}"
        div(v-else).price-badge
          span(v-if="item.Max_Price > item.PriceDiscount").old="{{item.Max_Price}}₽/{{$t('aoc1')}}"
          span="{{item.PriceDiscount}}₽/{{$t('aoc1')}}"
        div.preview(:lazy-background="item.PrimaryImage ? $assets.prepare_url_to_local(item.PrimaryImage, $config.environment, $config.local_url) : $assets.prepare_url_to_local(item.img, $config.environment, $config.local_url)")
        div(v-if="item.features_options.length > 0").item-features.px-1
          span(v-for="(f, fdx) in item.features_options" :key="fdx" v-bind:class="$assets.fetchFeatureClass(f.name)")="{{$t(f.name)}}"
    div.media-info.px-4.pt-4.pb-2.text-center
      h3.m-0="{{item.naimenovanie}}"
      div.divider
    div(v-if="item.naimenovanie === 'Xiaomi MiJia Electric Scooter M365'").item-content
      div.info_lap
        p.l="{{$t('aoc2')}}"
        p.r="{{item.godvypuska}}"
      div.info_lap
        p.l="{{$t('aoc3')}}"
        p.r="100{{$t('p6')}}"
      div.info_lap
        p.l="{{$t('aoc4')}}"
        p.r="30{{$t('p3')}}"
      div.info_lap
        p.l="{{$t('aoc5')}}"
        p.r="250 {{$t('p5')}}"
      div.info_lap
        p.l="{{$t('aoc6')}}"
        p.r="25 {{$t('p4')}}"
    div(v-else).item-content
      div.info_lap
        p.l="{{$t('aoc2')}}"
        p.r="{{item.godvypuska}}"
      div.info_lap
        p.l="{{$t('aoc7')}}"
        p.r="{{$t(item.kpp)}}"
      div.info_lap
        p.l="{{$t('aoc8')}}"
        p.r="{{$t(item.toplivo)}}"
      div.info_lap
        p.l="{{$t('aoc9')}}"
        p.r(v-html="`${item.dvigatel.toFixed(1)}${$t('p1')}.`")
      div.info_lap
        p.l="{{$t('aoc10')}}"
        p.r="{{$t(item.cvet)}}"
    div.item-action
      div.p-1.px-2.w-100
        a(href="javascript:void(0)" @click="oneClickRent(item.ID)").one_click="{{$t('af0')}}"
      div.p-1.px-2.w-100
        nuxt-link(:to="{name: $assets.prefix('booking-online-car_id', $i18n.locale), params: {car_id: item.ID}}")="{{$t('aoc11')}}"
      one-click-modal-snippet(:slug="item.ID" :title="item.naimenovanie" :price="item.PriceDiscount" :is_rent="false")
</template>

<script>
import OneClickModalSnippet from "@/components/oneClickModalSnippet";
export default {
  name: "newOfferCardRestyle",
  components: {OneClickModalSnippet},
  computed: {
    item(){
      return {...this.loaded_item, ...this.stored_item}
    }
  },
  methods: {
    oneClickRent(slug){
      this.$bvModal.show(`modal-one-click${slug}`);
      ym(33072038,'reachGoal','arenda 1 klik')
    },
  },
  props:{
    loaded_item: {
      type: Object,
      required: true
    },
    stored_item: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="sass" scoped>
@import "../assets/styles/variables"
.item-card
  border: 1px solid rgba(205,205,205,0.5)
  -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
  -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
  box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
  transition: 0.3s
  position: relative
  @media screen and (max-width: 375px)
    -webkit-box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.4)
    box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.4)
  &:hover
    -webkit-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
    box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
  .price-badge
    span
      display: block
      font-size: 14px
      &.old
        color: #ECECEC
        font-size: 12px
        text-decoration: line-through
        float: right
    color: #ffffff
    background-color: blueviolet
    padding: 5px 10px 5px 20px
    position: absolute
    top: 0
    right: 0
    border-radius: 0 0 0 15px
    -webkit-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
    box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.4)
    z-index: 1
    @media screen and (max-width: 375px)
      top: 0
      right: 0
  .item-header
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: row
    flex-wrap: wrap
  .media
    width: 100%
    position: relative
    .preview
      height: 250px
      width: 100%
      background-repeat: no-repeat
      background-size: cover
      background-position: center
      align-items: center
      position: relative
    .item-color
      position: absolute
      top: 5px
      left: 5px
      width: 20px
      height: 20px
      border: 1px solid rgba(205,205,205,0.5)
      -webkit-box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.4)
      -moz-box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.4)
      box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.4)
      border-radius: 25px
  .media-info
    width: 100%
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
    position: absolute
    bottom: 0
    left: 0
    background: rgba(0,0,0,0.3)
    background: linear-gradient(0deg, rgba(2,0,36,0.3) 0%, rgba(121,76,9,0.3) 50%, rgba(0,212,255,0) 100%)
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
    padding: 15px 0
    flex-direction: column
    a
      background-color: $primary
      font-family: 'Roboto Condensed', sans-serif
      color: #ffffff
      font-size: 16px
      text-align: center
      padding: 5px 25px
      transition: 0.3s
      border-radius: 0.25rem
      width: 100%
      display: block
      text-transform: uppercase
      &:hover
        background-color: $primary_hover
      &.one_click
        background-color: $primary_hover
        &:hover
          background-color: $primary
</style>
