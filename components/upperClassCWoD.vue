<template lang="pug">
  div.cwod-wrapper
    b-row
      b-col(sm="6" md="6" lg="6" v-for="(i, idx) in withPagen" :key="idx").my-3
        nuxt-link(:to="{name: $assets.prefix('rent-car_slug', $i18n.locale), params: {car_slug: i.self_data.slug}}").no_dec
          div.el
            b-row
              b-col(sm="12" md="12" lg="6")
                div.el-wrapper
                  div.price-badge(v-html="`${$t('cwd27')} ${$assets.toMoney(i.car_data.stoimost - ((i.car_data.stoimost/ 100) * i.car_data.skidka_2))}₽/${$t('cwod7')}`")
                  div.main-img(v-bind:style="{backgroundImage:`url(${$assets.check_local_env($config.local_url, $config.environment)}${i.self_data.photos[0]})`}" :alt="i.self_data.title")
                  div.flox-img(v-bind:style="{backgroundImage:`url(${$assets.check_local_env($config.local_url, $config.environment)}${i.self_data.photos[1]})`}" :alt="i.self_data.title")
                  div.flox-img(v-bind:style="{backgroundImage:`url(${$assets.check_local_env($config.local_url, $config.environment)}${i.self_data.photos[2]})`}" :alt="i.self_data.title")
              b-col(sm="12" md="12" lg="6")
                div.el-info-wrapper.pr-lg-3.px-md-2.px-sm-2.px-2.py-3
                  div.wrao
                    div
                      h5="{{i.self_data.title}}"
                      div.item-info.my-2
                        p.l="{{$t('cwod1')}}"
                        p.r="{{$t(i.car_data.klassavtomobilya)}}"
                      div.item-info.my-2
                        p.l="{{$t('cwod2')}}"
                        p.r="{{i.tth.passa}}"
                      div.item-info.my-2
                        p.l="{{$t('cwod3')}}"
                        p.r="{{$t(i.car_data.toplivo)}}"
                      div.item-info.my-2
                        p.l="{{$t('cwod4')}}"
                        p.r="{{i.tth.rashod}}"
                      div.item-info.my-2
                        p.l="{{$t('cwod5')}}"
                        p.r="{{makeEngine(i.car_data.dvigatel)}}"
                      div.item-info.my-2
                        p.l="{{$t('cwod6')}}"
                        p.r="{{i.car_data.godvypuska}}"
                    div.action.w-100
                      nuxt-link(:to="{name: $assets.prefix('rent-car_slug', $i18n.locale), params: {car_slug: i.self_data.slug}}").btn.main.w-100="{{$t('af1')}}"
</template>

<script>
  export default {
    name: "upperClassCWoD",
    props:{
      items: {
        type: Array
      }
    },
    data(){
      return {
        currentPage: 1,
        perPage: 10,
      }
    },
    watch:{
      currentPage(){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    },
    computed:{
      withPagen() {
        return this.items;
      }
    },
    methods:{
      makeEngine(val){
        return parseFloat(val).toFixed(1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/styles/variables"
  .wrao
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    min-height: 285px
  .no_dec
    color: #222222
    text-decoration: none
  .el
    background: #ffffff
    border: 1px solid rgba(205,205,205,0.5)
    -webkit-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    -moz-box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    box-shadow: 3px 3px 10px 0 rgba(0,0,0,0.4)
    @media screen and (max-width: 760px)
      box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4)
  .el-info-wrapper
    .item-info
      margin-bottom: 5px
      margin-top: 5px
      &:after
        content: '. . . . . . . . . . . . . . . . . . . .'
        display: block
        white-space: nowrap
        overflow: hidden
        font-size: 14px
      .l
        font-weight: bold
        float: left
        padding-right: 5px
        margin: 0
        font-size: 12px
        text-transform: uppercase
      .r
        float: right
        padding-left: 5px
        margin: 0
        font-size: 14px
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
</style>
